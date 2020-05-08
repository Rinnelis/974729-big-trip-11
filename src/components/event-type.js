import AbstractComponent from "./abstract-component.js";
import {generateEvent} from "../mock/event.js";
import {ucFirstLetter} from "../utils/common.js";

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
  const {type} = generateEvent();

  const typesArray = Array.from(type);
  const eventTransfersMarkup = typesArray.slice(0, 7).map((typeInstance, i) => createEventTypeMarkup(typeInstance[0], i === 0)).join(`\n`);
  const eventActivitiesMarkup = typesArray.slice(7, 10).map((typeInstance) => createEventTypeMarkup(typeInstance[0])).join(`\n`);

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
  getTemplate() {
    return createEventTypeTemplate();
  }
}
