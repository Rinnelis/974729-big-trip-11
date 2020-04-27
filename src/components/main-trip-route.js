import AbstractComponent from "./abstract-component.js";
import {EVENT_ITEMS, MONTH_NAMES} from "../const.js";
import {getRandomMassiveComponent, getRandomNumber} from "../utils/common.js";

const createMainTripRouteTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getRandomMassiveComponent(EVENT_ITEMS)} &mdash; ${getRandomMassiveComponent(EVENT_ITEMS)} &mdash; ${getRandomMassiveComponent(EVENT_ITEMS)}</h1>
      <p class="trip-info__dates">${getRandomMassiveComponent(MONTH_NAMES)} ${getRandomNumber(1, 16)} &mdash; ${getRandomNumber(16, 32)}</p>
    </div>`
  );
};

export default class MainTripRoute extends AbstractComponent {
  getTemplate() {
    return createMainTripRouteTemplate();
  }
}
