import EventItemComponent from "../components/event-item.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyEvent = {
  id: String(Date.now() + Math.random()),
  city: ``,
  type: `bus`,
  start: new Date(),
  end: new Date(),
  description: ``,
  offers: [],
  photos: [],
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

  render(event, index, mode) {
    const oldEventItemComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventItemComponent = new EventItemComponent(event, index);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventItemComponent.setClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._replaceEditToEvent();
      this._onDataChange(this, event, data);
    });
    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

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
