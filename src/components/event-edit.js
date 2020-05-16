import AbstractSmartComponent from "./abstract-smart-component.js";
import {EVENT_CITIES, EVENT_TYPES, TYPES, Direction} from "../mock/event.js";
import {ucFirstLetter} from "../utils/common.js";
import {EmptyEvent} from '../controllers/point.js';

import flatpickr from "flatpickr";
import moment from "moment";
import "flatpickr/dist/flatpickr.min.css";

const createOffersTemplate = (offers) => {
  return offers.map((offer) => {
    return (
      `<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="event-offer-${offer.type}-1" 
          type="checkbox" 
          name="event-offer-${offer.type}" 
        >
        <label class="event__offer-label" for="event-offer-${offer.type}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join(``);
};

const createPhotosTemplate = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  }).join(``);
};

const createEventTypeMarkup = (type, chosenType) => {
  return (
    `<div class="event__type-item">
      <input 
        id="event-type-${type}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" name="event-type" 
        value="${type}"
        ${type === chosenType ? `checked` : ``}
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1"
        >${ucFirstLetter(type)}</label
      >
    </div>`
  );
};

const createEventEditTemplate = (event) => {
  const {city, type, description, photos, offers, price, start, end, isFavorite} = event;

  let creatingPoint = false;

  if (event === EmptyEvent) {
    creatingPoint = true;
  }

  const startDate = moment(start).format(`DD/MM/YY HH:mm`);
  const endDate = moment(end).format(`DD/MM/YY HH:mm`);

  const eventsMarkup = EVENT_CITIES.map((cityName) => `<option value="${cityName}"></option>`).join(`\n`);
  const photoMarkup = createPhotosTemplate(photos);

  const typesArray = TYPES;
  const eventTransfersMarkup = typesArray.slice(0, 7).map((typeInstance) => createEventTypeMarkup(typeInstance, type)).join(`\n`);
  const eventActivitiesMarkup = typesArray.slice(7, 10).map((typeInstance) => createEventTypeMarkup(typeInstance, type)).join(`\n`);

  let rightDirection;
  if (type === `check-in` || type === `sightseeing` || type === `restaurant`) {
    rightDirection = Direction.IN;
  } else {
    rightDirection = Direction.TO;
  }

  const offerMarkup = createOffersTemplate(offers);
  const isCheckedFavouriteButton = isFavorite ? `checked` : ``;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input 
            class="event__type-toggle  visually-hidden" 
            id="event-type-toggle-1" 
            type="checkbox"
          >
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${eventTransfersMarkup}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${eventActivitiesMarkup}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${ucFirstLetter(type)} ${rightDirection}
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
            type="number"
            name="event-price" 
            value="${price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${creatingPoint ? `Cancel` : `Delete`}</button>

        <input 
          id="event-favorite-1" 
          class="event__favorite-checkbox  visually-hidden" 
          type="checkbox" 
          name="event-favorite"
          ${isCheckedFavouriteButton}
        >
        <label class="event__favorite-btn ${creatingPoint ? `visually-hidden` : ``}" for="event-favorite-1">
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
          <div class="event__available-offers">
          ${offerMarkup}
          </div>
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

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._type = event.type;
    this._flatpickr = null;
    this._submitHandler = null;
    this._clickHandler = null;
    this._deleteButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  reset() {
    const event = this._event;

    this._type = event.type;
    this._city = event.city;

    this.rerender();
  }

  removeElement() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
      this._clickHandler = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
    .addEventListener(`change`, (evt) => {
      const targetValue = evt.target.value;
      this._type = EVENT_TYPES.get(targetValue);

      this._event.type = this._type;
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
