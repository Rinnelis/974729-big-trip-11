import AbstractSmartComponent from "./abstract-smart-component.js";
import {EVENT_CITIES, EVENT_TYPES} from "../mock/event.js";
import {getRandomNumber} from "../utils/common.js";
import EventTypeComponent from "./event-type.js";
import EventOfferComponent from "./event-offer.js";

import flatpickr from "flatpickr";
import moment from "moment";
import "flatpickr/dist/flatpickr.min.css";


const createEventEditTemplate = (event) => {
  const {city, typeItem, description, price, start, end, isFavorite} = event;

  const photoSrc = `http://picsum.photos/248/152?r=${Math.random()}`;

  const startDate = moment(start).format(`DD/MM/YY HH:mm`);
  const endDate = moment(end).format(`DD/MM/YY HH:mm`);

  const descriptionMarkup = description[getRandomNumber(0, description.length)];
  const eventsMarkup = EVENT_CITIES.map((cityName) => `<option value="${cityName}"></option>`).join(`\n`);
  const photoMarkup = `<img class="event__photo" src=${photoSrc} alt="Event photo">`;
  const typeMarkup = new EventTypeComponent().getElement();
  const offerMarkup = new EventOfferComponent().getElement();
  const isCheckedFavouriteButton = isFavorite ? `checked` : ``;

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
            ${typeItem}
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
            value="${startDate}"
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
            value="${endDate}"
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

        <input 
          id="event-favorite-1" 
          class="event__favorite-checkbox  visually-hidden" 
          type="checkbox" 
          name="event-favorite"
          ${isCheckedFavouriteButton}
        >
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
            
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${offerMarkup.outerHTML}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
          ${descriptionMarkup}
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

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._typeItem = event.typeItem;
    this._flatpickr = null;
    this._submitHandler = null;
    this._clickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  reset() {
    const event = this._event;

    this._typeItem = event.typeItem;
    this._city = event.city;

    this.rerender();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setClickHandler(this._clickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._clickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
    .addEventListener(`change`, (evt) => {
      this._typeItem = EVENT_TYPES.get(evt.target.value);
      this.rerender();
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }

    const element = this.getElement();
    const options = {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      minDate: this._event.start,
      enableTime: true
    };

    this._flatpickrStartDate = flatpickr(element.querySelector(`#event-start-time-1`), Object.assign({}, options, {defaultDate: this._event.start}));
    this._flatpickrEndDate = flatpickr(element.querySelector(`#event-end-time-1`), Object.assign({}, options, {defaultDate: this._event.end}));
  }
}
