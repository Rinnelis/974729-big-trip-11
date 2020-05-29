import AbstractComponent from "./abstract-component.js";

const PointsAmount = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3
};

const SubstringNumber = {
  FOUR: 4,
  SIX: 6,
  TEN: 10
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
      eventsLength = events[0].city + ` &mdash; ` + events[events.length - 1].city;
      break;
    case PointsAmount.THREE:
      eventsLength = events[0].city + ` &mdash; ` + events[1].city + ` &mdash; ` + events[events.length - 1].city;
      break;
    default:
      eventsLength = events[0].city + ` &mdash;` + ` &hellip; ` + `&mdash; ` + events[events.length - 1].city;
      break;
  }
  return eventsLength;
};

const getTripDuration = (events) => {
  if (events.length === 0) {
    return ``;
  }
  if (events.length === 1) {
    return new Date(events[0].start).toDateString().substring(SubstringNumber.FOUR, SubstringNumber.TEN) + ` &mdash; ` + new Date(events[0].end).toDateString().substring(SubstringNumber.FOUR, SubstringNumber.TEN);
  }
  const sortedEvents = events.sort((current, next) => new Date(current.start) - new Date(next.start));
  return new Date(sortedEvents[0].start).toDateString().substring(SubstringNumber.FOUR, SubstringNumber.TEN) + ` &mdash; ` + (new Date(sortedEvents[sortedEvents.length - 1].end)).toDateString().substr(SubstringNumber.FOUR, SubstringNumber.SIX);
};

const createTripInfoTemplate = (events) => {
  const tripCitiesMarkup = getTripCities(events);
  const tripDurationMarkup = getTripDuration(events);

  let tripCost = `0`;

  if (events.length > 0) {
    const offerCosts = [];
    events.map((event) => event.offers.forEach((offer) => offerCosts.push(offer.price)));
    tripCost = events.map((event) => event.price).reduce((acc, price) => acc + price, 0) + offerCosts.reduce((acc, offerCost) => acc + offerCost, 0);
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripCitiesMarkup}</h1>
        <p class="trip-info__dates">${tripDurationMarkup}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">${tripCost}</span>
      </p>
    </section>`
  );
};

export default class MainTripInfo extends AbstractComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }

  getTemplate() {
    return createTripInfoTemplate(this._pointsModel.getPointsAll());
  }
}
