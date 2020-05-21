import AbstractComponent from './abstract-component.js';
import MainTripPriceComponent from "./main-trip-price.js";

const PointsAmount = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3
};

const getTripCities = (events) => {
  let eventsLength = 0;
  switch (events.length) {
    case PointsAmount.ZERO:
      eventsLength = ``;
      break;
    case PointsAmount.ONE:
      eventsLength = events[0].city;
      break;
    case PointsAmount.TWO:
      eventsLength = events[0].city + ` &mdash; ` + events[1].city;
      break;
    case PointsAmount.THREE:
      eventsLength = events[0].city + ` &mdash; ` + events[1].city + ` &mdash; ` + events[2].city;
      break;
    default:
      eventsLength = events[0].city + ` &mdash;` + ` &hellip; ` + `&mdash; ` + events[events.length - 1].city;
      break;
  }
  return eventsLength;
};

const getTripInterval = (events) => {
  if (events.length === 0) {
    return ``;
  } else if (events.length === 1) {
    return new Date(events[0].start).toDateString().substring(4, 10) + ` &mdash; ` + new Date(events[0].end).toDateString().substring(4, 10);
  } else {
    return new Date(events[0].start).toDateString().substring(4, 10) + ` &mdash; ` + (new Date(events[events.length - 1].end)).toDateString().substr(4, 6);
  }
};

const createTripInfoTemplate = (events) => {
  const tripCitiesMarkup = getTripCities(events);
  const tripIntervalMarkup = getTripInterval(events);
  const tripPriceMarkup = new MainTripPriceComponent(events).getElement();

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripCitiesMarkup}</h1>
        <p class="trip-info__dates">${tripIntervalMarkup}</p>
      </div>
      ${tripPriceMarkup.outerHTML}
    </section>`
  );
};

export default class MainTripInfo extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
