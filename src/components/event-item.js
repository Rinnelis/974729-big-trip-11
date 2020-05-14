import AbstractComponent from "./abstract-component.js";
import {getRandomNumber, getRandomMassiveComponent, getDurationTime} from "../utils/common.js";
import moment from "moment";

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

const createEventTitleTemplate = (key, value, city) => {
  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${key}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${value} ${city}</h3>`
  );
};

const createEventItemTemplate = (event, index) => {
  const {city, type, start, end, price, offers} = event;

  const startDate = moment(start).format(`YYYY-MM-DDThh:mm:ss`);
  const endDate = moment(end).format(`YYYY-MM-DDThh:mm:ss`);
  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);
  const durationTime = getDurationTime(end - start);

  const titles = offers[getRandomNumber(0, offers.length)];
  const offerTitle = titles.name;
  const offerPrice = titles.price;

  const typesArray = Array.from(type);
  const randomType = getRandomMassiveComponent(typesArray);
  const titlesMarkup = createEventTitleTemplate(randomType[0], randomType[1], city);

  const dayMarkup = createDayTemplate(start, index);

  return (
    `<li class="trip-days__item  day">
      ${dayMarkup}

      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            ${titlesMarkup}

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
              <li class="event__offer">
                <span class="event__offer-title">${offerTitle}</span>
                &plus;
                &euro;&nbsp;
                <span class="event__offer-price">${offerPrice}</span>
              </li>
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
