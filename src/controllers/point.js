import EventItemComponent from "../components/event-item.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import moment from "moment";
import Point from "../models/point.js";
import DestinationsList from '../models/destinations.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const parseFormData = (formData) => {
  const destination = DestinationsList.getList().find((city) => city.name === formData.get(`event-destination`));
  const checkedOffers = [...document.querySelectorAll(`.event__offer-checkbox:checked + label[for^="event"]`)];

  return new Point({
    'id': `0`,
    'type': formData.get(`event-type`),
    'destination': {
      'description': destination.description,
      'name': destination.name,
      'pictures': destination.pictures
    },
    'date_from': new Date(moment(formData.get(`event-start-time`), `DD/MM/YYYY HH:mm`).valueOf()).toISOString(),
    'date_to': new Date(moment(formData.get(`event-end-time`), `DD/MM/YYYY HH:mm`).valueOf()).toISOString(),
    'base_price': Number(formData.get(`event-price`)),
    'offers': checkedOffers.map((offer) => ({
      'title': offer.querySelector(`.event__offer-title`).textContent,
      'price': Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
    'is_favorite': Boolean(formData.get(`event-favorite`)),
  });
};

export const EmptyEvent = {
  id: String(Date.now() + Math.random()),
  city: ``,
  type: `bus`,
  start: new Date(),
  end: new Date(),
  description: ``,
  offers: [],
  pictures: [],
  price: 0,
  isFavorite: false
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventItemComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventItemComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventItemComponent = new EventItemComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventItemComponent.setClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      const newEvent = Point.clone(event);
      newEvent.isFavorite = !newEvent.isFavorite;

      this._onDataChange(this, event, newEvent);
    });

    this._eventEditComponent.setSubmitHandler(() => {
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData);
      this._eventEditComponent.disable();
      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      this._onDataChange(this, event, data);
      this._eventEditComponent.activate();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, event, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventItemComponent) {
          replace(this._eventItemComponent, oldEventItemComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(this._container, this._eventItemComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventItemComponent) {
          remove(oldEventItemComponent);
          remove(oldEventEditComponent);
        }
        this._onViewChange();
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventItemComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventItemComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventItemComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventItemComponent, this._eventEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
