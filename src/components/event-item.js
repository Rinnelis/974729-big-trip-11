import AbstractComponent from "./abstract-component.js";
import {ucFirstLetter, getRandomMassiveComponent, getRandomNumber} from "../utils/common.js";

const createEventTitleTemplate = (name, city) => {
  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${name}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${ucFirstLetter(name)} to ${city}</h3>`
  );
};

const createEventItemTemplate = (event) => {
  const {city, type, time, duration, price, offers} = event;

  const titles = offers[getRandomNumber(0, offers.length)];
  const offerTitle = titles.name;

  const titlesMarkup = createEventTitleTemplate(getRandomMassiveComponent(type), city);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            ${titlesMarkup}

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${time}</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">${time}</time>
              </p>
              <p class="event__duration">${duration}M</p>
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
                <span class="event__offer-price">${price}</span>
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
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
