import EventItemComponent from "../components/event-item.js";
import EventEditComponent from "../components/event-edit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    this._eventItemComponent = new EventItemComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventItemComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setRollupButtonClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    render(this._container, this._eventItemComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventItemComponent);
  }

  _replaceEditToEvent() {
    replace(this._eventItemComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
