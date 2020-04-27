import EventEditComponent from "../components/event-edit.js";
import EventItemComponent from "../components/event-item.js";
import NoEventsComponent from "../components/no-events.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const EVENT_COUNT = 15;
const ZERO_EVENTS = 0;

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noEventsComponent = new NoEventsComponent();
    this._eventItemComponent = new EventItemComponent();
    this._eventEditComponent = new EventEditComponent();
  }

  render() {
    const container = this._container;

    if (EVENT_COUNT === ZERO_EVENTS) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }

    for (let i = 0; i < EVENT_COUNT; i++) {
      const replaceEventToEdit = () => {
        replace(eventEditComponent, eventItemComponent);
      };

      const replaceEditToEvent = () => {
        replace(eventItemComponent, eventEditComponent);
      };

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
          replaceEditToEvent();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      const eventItemComponent = this._eventItemComponent;
      eventItemComponent.setRollupButtonClickHandler(() => {
        replaceEventToEdit();
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      const eventEditComponent = this._eventEditComponent;
      eventEditComponent.setSaveButtonClickHandler(() => {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      render(container, eventItemComponent, RenderPosition.BEFOREEND);
    }
  }
}
