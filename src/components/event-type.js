import {EVENT_TRANSFER_TYPES, EVENT_ACTIVITY_TYPES} from "../const.js";
import {createElement, ucFirstLetter} from "../utils.js";

const createEventTypeMarkup = (name, isChecked) => {
  return (
    `<div class="event__type-item">
      <input 
        id="event-type-${name}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" name="event-type" 
        value="${name}"
        ${isChecked ? `checked` : ``}
      >
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1"
        >${ucFirstLetter(name)}</label
      >
    </div>`
  );
};

const createEventTypeTemplate = () => {
  const eventTransfersMarkup = EVENT_TRANSFER_TYPES.map((type, i) => createEventTypeMarkup(type, i === 0)).join(`\n`);
  const eventActivitiesMarkup = EVENT_ACTIVITY_TYPES.map((type) => createEventTypeMarkup(type)).join(`\n`);

  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${eventTransfersMarkup}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${eventActivitiesMarkup}
      </fieldset>
    </div>`
  );
};

export default class EventType {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventTypeTemplate();
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
