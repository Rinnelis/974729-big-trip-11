import AbstractComponent from "./abstract-component.js";
import {ucFirstLetter} from "../utils/common.js";

const createEventTypeMarkup = (type, chosen) => {
  return (
    `<div class="event__type-item">
      <input 
        id="event-type-${type}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" name="event-type" 
        value="${type}"
        ${type === chosen ? `checked` : ``}
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1"
        >${ucFirstLetter(type)}</label
      >
    </div>`
  );
};

const createEventTypeTemplate = (type, chosenType) => {
  const typesArray = Array.from(type);
  const chosen = chosenType.slice(0, -3).toLowerCase();
  const eventTransfersMarkup = typesArray.slice(0, 7).map((typeInstance) => createEventTypeMarkup(typeInstance[0], chosen)).join(`\n`);
  const eventActivitiesMarkup = typesArray.slice(7, 10).map((typeInstance) => createEventTypeMarkup(typeInstance[0], chosen)).join(`\n`);

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

export default class EventType extends AbstractComponent {
  constructor(type, chosenType) {
    super();
    this._type = type;
    this._chosenType = chosenType;
  }

  getTemplate() {
    return createEventTypeTemplate(this._type, this._chosenType);
  }
}
