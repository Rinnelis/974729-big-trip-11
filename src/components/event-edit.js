import {EVENT_TRANSFER_TYPES, EVENT_ACTIVITY_TYPES, EVENT_ITEMS} from "../const.js";
import {getRandomMassiveComponent, getRandomNumber} from "../utils.js";
import {createEventTypeTemplate} from "./event-type.js";
import {createOfferTemplate} from "./event-offer.js";
import {descriptionText} from "../mock/description.js";


export const createEventEditTemplate = (offers) => {

  const photoSrc = `http://picsum.photos/248/152?r=${Math.random()}`;
  const date = `19/04/20`;
  const time = `11:30`;

  const eventTransfersMarkup = EVENT_TRANSFER_TYPES.map((type, i) => createEventTypeTemplate(type, i === 0)).join(`\n`);
  const eventActivitiesMarkup = EVENT_ACTIVITY_TYPES.map((type) => createEventTypeTemplate(type)).join(`\n`);
  const eventsMarkup = EVENT_ITEMS.map((item) => `<option value="${item}"></option>`).join(`\n`);
  const offersMarkup = offers.map((offer) => createOfferTemplate(offer)).join(`\n`);
  const photoMarkup = `<img class="event__photo" src=${photoSrc} alt="Event photo">`;

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

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${eventTransfersMarkup}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${eventActivitiesMarkup}
              </div>
            </fieldset>
          </div>
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
            value="${getRandomMassiveComponent(EVENT_ITEMS)}" 
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
            value="${getRandomNumber(50, 2000)}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
            
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersMarkup}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
          ${descriptionText}
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
