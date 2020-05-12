import SortComponent, {SortType} from "../components/sort.js";
import PointController from "./point.js";
import EventsComponent from "../components/events.js";
import NoEventsComponent from "../components/no-events.js";
import {render, RenderPosition} from "../utils/render.js";
import {EVENT_COUNT} from "../main.js";

const ZERO_EVENTS = 0;

const renderEvents = (eventsList, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(eventsList, onDataChange, onViewChange);
    pointController.render(event);

    return pointController;
  });
};

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const eventsList = events.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedEvents = eventsList;
      break;
    case SortType.TIME:
      sortedEvents = eventsList.sort((a, b) => (b.end - b.start) - (a.end - a.start));
      break;
    case SortType.PRICE:
      sortedEvents = eventsList.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container.getElement();
    this._events = [];
    this._showedEventControllers = [];
    this._eventsComponent = new EventsComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    const container = this._container;
    this._events = events;

    render(container, this._sortComponent, RenderPosition.BEFOREEND);

    if (EVENT_COUNT === ZERO_EVENTS) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._eventsComponent, RenderPosition.BEFOREEND);
    }

    const eventListElement = this._eventsComponent.getElement();

    const newEvents = renderEvents(eventListElement, events, this._onDataChange, this._onViewChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvents);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    const eventListElement = this._eventsComponent.getElement();
    eventListElement.innerHTML = ``;

    const newEvents = renderEvents(eventListElement, sortedEvents, this._onDataChange, this._onViewChange);
    this._showedEventControllers = newEvents;
  }
}
