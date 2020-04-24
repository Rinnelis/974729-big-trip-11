import {EVENT_ITEMS, MONTH_NAMES} from "../const.js";
import {createElement, getRandomMassiveComponent, getRandomNumber} from "../utils.js";

const createMainTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRandomMassiveComponent(EVENT_ITEMS)} &mdash; ${getRandomMassiveComponent(EVENT_ITEMS)} &mdash; ${getRandomMassiveComponent(EVENT_ITEMS)}</h1>
        <p class="trip-info__dates">${getRandomMassiveComponent(MONTH_NAMES)} ${getRandomNumber(1, 16)} &mdash; ${getRandomNumber(16, 32)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomNumber(100, 2000)}</span>
      </p>
    </section>`
  );
};

export default class MainTripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainTripInfoTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
