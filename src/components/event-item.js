import AbstractComponent from "./abstract-component.js";
import {getDurationTime} from "../utils/common.js";
import {Direction} from "../mock/event.js";
import {ucFirstLetter} from "../utils/common.js";
import moment from "moment";

const createOffersTemplate = (offers) => {
  return offers.map((offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  }).join(``);
};

const createDayTemplate = (date, index) => {
  let eventDay = ``;

  if (date && index) {
    const fullDate = moment(date).format(`YYYY-MM-DDThh:mm`);
    const month = moment(date).format(`MMM`);
    const day = moment(date).format(`DD`);

    eventDay = `<span class="day__counter">${index}</span>
    <time class="day__date" datetime="${fullDate}">${month} ${day}</time>`;
  }

  return (
    `<div class="day__info">${eventDay}</div>`
  );
};

const createTypesTemplate = (type, city) => {
  let rightDirection;
  if (type === `check-in` || type === `sightseeing` || type === `restaurant`) {
    rightDirection = Direction.IN;
  } else {
    rightDirection = Direction.TO;
  }

  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${ucFirstLetter(type)} ${rightDirection} ${city}</h3>`
  );
};

const createEventItemTemplate = (event, index) => {
  const {city, type, start, end, price, offers} = event;

  const startDate = moment(start).format(`YYYY-MM-DDThh:mm:ss`);
  const endDate = moment(end).format(`YYYY-MM-DDThh:mm:ss`);
  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);
  const durationTime = getDurationTime(end - start);

  const offersMarkup = createOffersTemplate(offers);
  const typesMarkup = createTypesTemplate(type, city);

  const dayMarkup = createDayTemplate(start, index);

  return (
    `<li class="trip-days__item  day">
      ${dayMarkup}

      <ul class="trip-events__list">
        <li class="trip-events__item">
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
        </li>
      </ul>
    </li>`
  );
};

export default class EventItem extends AbstractComponent {
  constructor(event, index) {
    super();
    this._event = event;
    this._index = index + 1;
  }

  getTemplate() {
    return createEventItemTemplate(this._event, this._index);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
