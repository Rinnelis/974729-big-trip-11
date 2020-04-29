import SortComponent, {SortType} from "../components/sort.js";
import EventEditComponent from "../components/event-edit.js";
import EventItemComponent from "../components/event-item.js";
import EventsComponent from "../components/events.js";
import NoEventsComponent from "../components/no-events.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const EVENT_COUNT = 15;
const ZERO_EVENTS = 0;

const renderEvent = (eventsList, event) => {
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

  const eventItemComponent = new EventItemComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  eventItemComponent.setRollupButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setSaveButtonClickHandler(() => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsList, eventItemComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (eventsList, events) => {
  events.forEach((event) => {
    renderEvent(eventsList, event);
  });
};

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents = events;
      break;
    case SortType.TIME:
      sortedEvents = events.sort((a, b) => b.duration - a.duration);
      break;
    case SortType.PRICE:
      sortedEvents = events.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container.getElement();
    this._eventsComponent = new EventsComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
  }

  render(events) {
    const container = this._container;

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._eventsComponent, RenderPosition.BEFOREEND);

    if (EVENT_COUNT === ZERO_EVENTS) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }

    const eventListElement = this._eventsComponent.getElement();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      eventListElement.innerHTML = ``;
      const sortedEvents = getSortedEvents(events, sortType);

      renderEvents(eventListElement, sortedEvents);
    });
  }
}
