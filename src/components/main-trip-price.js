import AbstractComponent from "./abstract-component.js";
import {generateEvent} from "../mock/event.js";

const createMainTripPriceTemplate = () => {
  const {price} = generateEvent();

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class MainTripPrice extends AbstractComponent {
  getTemplate() {
    return createMainTripPriceTemplate();
  }
}
