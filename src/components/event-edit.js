import AbstractComponent from "./abstract-component.js";
import {EVENT_CITIES} from "../mock/event.js";
import EventTypeComponent from "./event-type.js";
import EventOfferComponent from "./event-offer.js";

const createEventEditTemplate = (event) => {
  const {city, time, price, description} = event;

  const photoSrc = `http://picsum.photos/248/152?r=${Math.random()}`;
  const date = `19/04/20`;

  const eventsMarkup = EVENT_CITIES.map((cityName) => `<option value="${cityName}"></option>`).join(`\n`);
  const photoMarkup = `<img class="event__photo" src=${photoSrc} alt="Event photo">`;
  const typeMarkup = new EventTypeComponent().getElement();
  const offerMarkup = new EventOfferComponent().getElement();

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input 
            class="event__type-toggle  visually-hidden" 
            id="event-type-toggle-1" 
            type="checkbox"
          >
          ${typeMarkup.outerHTML}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight to
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-1" 
            type="text" 
            name="event-destination" 
            value="${city}" 
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${eventsMarkup}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-start-time-1" 
            type="text" 
            name="event-start-time" 
            value="${date} ${time}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input 
            class="event__input  
            event__input--time" 
            id="event-end-time-1" 
            type="text" 
            name="event-end-time" 
            value="${date} ${time}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input 
            class="event__input  event__input--price" 
            id="event-price-1" 
            type="text" 
            name="event-price" 
            value="${price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
            
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${offerMarkup.outerHTML}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
          ${description}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoMarkup}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EventEdit extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventEditTemplate(event);
  }

  setSaveButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);
  }
}
