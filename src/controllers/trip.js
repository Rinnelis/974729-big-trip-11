import SortComponent, {SortType} from "../components/sort.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point.js";
import EventsComponent from "../components/events.js";
import NoEventsComponent from "../components/no-events.js";
import {render, RenderPosition} from "../utils/render.js";

const ZERO = 0;

const renderEvents = (eventsList, events, onDataChange, onViewChange) => {
  return events.map((event, index) => {
    const pointController = new PointController(eventsList, onDataChange, onViewChange);
    pointController.render(event, index, PointControllerMode.DEFAULT);

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
  constructor(container, pointsModel) {
    this._container = container.getElement();
    this._pointsModel = pointsModel;
    this._showedEventControllers = [];
    this._eventsComponent = new EventsComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const points = this._pointsModel.getPoints();

    render(container, this._sortComponent, RenderPosition.BEFOREEND);

    if (points.length === ZERO) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._eventsComponent, RenderPosition.BEFOREEND);
    }

    const eventListElement = this._eventsComponent.getElement();

    const newEvents = renderEvents(eventListElement, points, this._onDataChange, this._onViewChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvents);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const eventListElement = this._eventsComponent.getElement();
    this._creatingPoint = new PointController(eventListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyEvent, PointControllerMode.ADDING);
    this._onViewChange();
  }

  _removePoints() {
    this._eventsComponent.getElement().innerHTML = ``;
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _updatePoints() {
    const eventListElement = this._eventsComponent.getElement();

    this._removePoints();
    this._showedEventControllers = renderEvents(eventListElement, this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _onDataChange(pointController, oldData, newData) {

    if (oldData === EmptyEvent) {
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._showedEventControllers = [].concat(pointController, this._showedEventControllers);
        this._updatePoints();
      }

    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedEventControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const eventListElement = this._eventsComponent.getElement();
    const sortedEvents = getSortedEvents(this._pointsModel.getPoints(), sortType);

    this._removePoints();
    this._showedEventControllers = renderEvents(eventListElement, sortedEvents, this._onDataChange, this._onViewChange);
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
