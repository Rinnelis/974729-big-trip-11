import SortComponent, {SortType} from "../components/sort.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point.js";
import EventsComponent from "../components/events.js";
import NoEventsComponent from "../components/no-events.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {FILTER_TYPE} from "../const.js";
import TripDay from "../components/trip-day.js";
import TripItemsList from "../components/trip-items-list.js";
import moment from "moment";

const ZERO = 0;

const renderEvents = (eventsList, groupEvents, onDataChange, onViewChange) => {
  return groupEvents.map(([day, events], index) => {
    const days = renderDayItemsList({eventsList, day, events, index, onDataChange, onViewChange});
    return days;
  }).flat();
};

const renderDayItemsList = ({eventsList, day, events, index, onDataChange, onViewChange}) => {
  const tripDay = new TripDay(day, index + 1);
  render(eventsList, tripDay, RenderPosition.BEFOREEND);

  const tripItemList = new TripItemsList();
  render(tripDay.getElement(), tripItemList, RenderPosition.BEFOREEND);

  return events.map((event) => {
    const pointController = new PointController(tripItemList.getElement(), onDataChange, onViewChange);
    pointController.render(event, PointControllerMode.DEFAULT);

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
      sortedEvents = eventsList.sort((current, next) => (next.end - next.start) - (current.end - current.start));
      break;
    case SortType.PRICE:
      sortedEvents = eventsList.sort((current, next) => next.price - current.price);
      break;
  }

  return sortedEvents;
};

const getGroupPoints = (pointsList) => Object.entries(pointsList.reduce((acc, point) => {
  for (const start in acc) {
    if (moment(new Date(start)).isSame(moment(new Date(point.start)), `day`)) {
      acc[start].push(point);
      return acc;
    }
  }
  acc[point.start] = [point];
  return acc;
}, {})).sort((current, next) => current.start - next.start);

export default class TripController {
  constructor(container, filterController, pointsModel, api) {
    this._api = api;
    this._container = container.getElement();
    this._filterController = filterController;
    this._pointsModel = pointsModel;
    this._showedEventControllers = [];
    this._eventsComponent = new EventsComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._newEventButton = document.querySelector(`.trip-main__event-add-btn`);
    this._sortType = SortType.EVENT;
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._eventsComponent.hide();
    this._newEventButton.setAttribute(`disabled`, `disabled`);
    this._updatePoints();
  }

  show() {
    this._newEventButton.removeAttribute(`disabled`);
    this._onSortTypeChange(SortType.EVENT);
    this._sortType = SortType.EVENT;
    const sort = document.querySelector(`#sort-event`);
    sort.checked = true;
    this._eventsComponent.show();
    this._updatePoints();
  }

  render() {
    const container = this._container;
    const points = this._pointsModel.getPoints();

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._eventsComponent, RenderPosition.BEFOREEND);

    if (points.length === ZERO) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }

    const eventListElement = this._eventsComponent.getElement();

    const groupPoints = getGroupPoints(points);
    const newEvents = renderEvents(eventListElement, groupPoints, this._onDataChange, this._onViewChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvents);
  }

  createPoint(button) {
    if (this._creatingPoint) {
      return;
    }

    if (this._noEventsComponent) {
      remove(this._noEventsComponent);
    }

    this._newEventButton = button;
    this._newEventButton.setAttribute(`disabled`, `disabled`);
    const eventListElement = this._eventsComponent.getElement();

    const sortedEvents = getGroupPoints(getSortedEvents(this._pointsModel.getPointsAll(), SortType.EVENT));
    this._removePoints();
    this._sortComponent.setDefaultSort(SortType.EVENT);
    this._showedEventControllers = renderEvents(eventListElement, sortedEvents, this._onDataChange, this._onViewChange);

    const filteredEvents = getGroupPoints(getSortedEvents(this._pointsModel.getPoints(), FILTER_TYPE.EVERYTHING));
    this._filterController.setDefaultFilter();
    this._showedEventControllers = renderEvents(eventListElement, filteredEvents, this._onDataChange, this._onViewChange);

    this._creatingPoint = new PointController(eventListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(Object.assign({}, EmptyEvent), PointControllerMode.ADDING, button);
    this._onViewChange();
  }

  _removePoints() {
    const eventListElement = this._eventsComponent.getElement();
    eventListElement.innerHTML = ``;
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _updatePoints() {
    const eventListElement = this._eventsComponent.getElement();

    this._removePoints();
    this._showedEventControllers = renderEvents(eventListElement, getGroupPoints(this._pointsModel.getPoints()), this._onDataChange, this._onViewChange);

    if (this._pointsModel.getPointsAll().length <= ZERO) {
      render(this._container, this._noEventsComponent);
    } else {
      remove(this._noEventsComponent);
    }

    if (this._pointsModel.getPoints().length === ZERO) {
      this._filterController.disableFilter(this._pointsModel.getActiveFilterType());
    }

    this._onSortTypeChange(this._sortType);
  }

  _onDataChange(pointController, oldData, newData, button = this._newEventButton, isFavoriteUpdate = false) {
    if (oldData.id === `new`) {
      this._creatingPoint = null;
      button.removeAttribute(`disabled`);

      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
        .then((pointModel) => {
          this._pointsModel.addPoint(pointModel);
          pointController.render(newData, PointControllerMode.DEFAULT);
          this._showedEventControllers = [].concat(pointController, this._showedEventControllers);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });
      }

    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
      .then(() => {
        this._pointsModel.removePoint(oldData.id);
        this._updatePoints();
      })
      .catch(() => {
        pointController.shake();
      });
    } else {
      this._api.updatePoint(oldData.id, newData)
         .then((pointModel) => {
           const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

           if (isSuccess) {
             if (isFavoriteUpdate) {
               return;
             }
             pointController.render(pointModel, PointControllerMode.DEFAULT);
             this._updatePoints();
           }
         })
         .catch(() => {
           pointController.shake();
         });
    }
  }

  _onViewChange() {
    this._showedEventControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._removePoints();
    this._sortType = sortType;
    const eventListElement = this._eventsComponent.getElement();
    const sortedEvents = getSortedEvents(this._pointsModel.getPoints(), sortType);

    if (sortType === SortType.EVENT) {
      const groupPoints = getGroupPoints(sortedEvents);
      this._showedEventControllers = renderEvents(eventListElement, groupPoints, this._onDataChange, this._onViewChange);
    } else {
      const tripDay = new TripDay();
      render(eventListElement, tripDay, RenderPosition.BEFOREEND);

      const tripItemList = new TripItemsList();
      render(tripDay.getElement(), tripItemList, RenderPosition.BEFOREEND);
      for (const event of sortedEvents) {
        const pointController = new PointController(tripItemList.getElement(), this._onDataChange, this._onViewChange);
        pointController.render(event, PointControllerMode.DEFAULT);
        this._showedEventControllers.push(pointController);
      }
    }
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
