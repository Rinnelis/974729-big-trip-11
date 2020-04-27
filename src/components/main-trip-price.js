import AbstractComponent from "./abstract-component.js";
import {getRandomNumber} from "../utils/common.js";

const createMainTripPriceTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRandomNumber(100, 2000)}</span>
    </p>`
  );
};

export default class MainTripPrice extends AbstractComponent {
  getTemplate() {
    return createMainTripPriceTemplate();
  }
}
