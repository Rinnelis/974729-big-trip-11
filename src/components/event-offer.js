import AbstractComponent from "./abstract-component.js";
import {generateEvent} from "../mock/event.js";
import {getRandomNumber} from "../utils/common.js";

const createOfferMarkup = (offer) => {
  const {type, name} = offer;
  const price = getRandomNumber(10, 100);
  return (
    `<div class="event__offer-selector">
      <input 
        class="event__offer-checkbox  visually-hidden" 
        id="event-offer-${type}-1" 
        type="checkbox" 
        name="event-offer-${type}" 
      >
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferTemplate = () => {
  const {offers} = generateEvent();

  const offersMarkup = offers.map((offer) => createOfferMarkup(offer)).join(`\n`);

  return (
    `<div class="event__available-offers">
      ${offersMarkup}
    </div>`
  );
};

export default class EventOffer extends AbstractComponent {
  getTemplate() {
    return createOfferTemplate();
  }
}
