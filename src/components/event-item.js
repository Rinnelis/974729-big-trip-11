import {EVENT_TRANSFER_TYPES, EVENT_ITEMS} from "../const.js";
import {ucFirstLetter, getRandomMassiveComponent, getRandomNumber} from "../utils.js";

const createEventTitleTemplate = (name, city) => {
  return (
    `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${name}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${ucFirstLetter(name)} to ${city}</h3>`
  );
};

export const createEventItemTemplate = (offers) => {

  const titles = offers[getRandomNumber(0, offers.length)];
  const offerTitle = titles.name;
  const offerPrice = getRandomNumber(10, 100);

  const titlesMarkup = createEventTitleTemplate(getRandomMassiveComponent(EVENT_TRANSFER_TYPES), getRandomMassiveComponent(EVENT_ITEMS));

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
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
                  <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                </p>
                <p class="event__duration">30M</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;
                <span class="event__price-value">${getRandomNumber(50, 2000)}</span>
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
      </li>
    </ul>`
  );
};
