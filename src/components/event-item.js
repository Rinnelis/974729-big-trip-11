import AbstractComponent from "./abstract-component.js";
import {getDurationTime, ucFirstLetter} from "../utils/common.js";
import {Direction} from "../const.js";
import moment from "moment";

const MAX_SHOWING_OFFERS = 3;

const createOffersTemplate = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  }).slice(0, MAX_SHOWING_OFFERS).join(``);
};

const createTypesTemplate = (type, city) => {
  const rightDirection = type === `check-in` || type === `sightseeing` || type === `restaurant` ? Direction.IN : Direction.TO;

  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${ucFirstLetter(type)} ${rightDirection} ${city}</h3>`
  );
};

const createEventItemTemplate = (event) => {
  const {city, type, start, end, price, offers} = event;

  const startDate = moment(start).format(`YYYY-MM-DDThh:mm:ss`);
  const endDate = moment(end).format(`YYYY-MM-DDThh:mm:ss`);
  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);
  const durationTime = getDurationTime(end - start);

  const offersMarkup = createOffersTemplate(offers);
  const typesMarkup = createTypesTemplate(type, city);

  return (
    `<li class="trip-events__item">
      <div class="event">
        ${typesMarkup}

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}">${endTime}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;
          <span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventItem extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
