import {ucFirstLetter} from "../utils.js";

export const createEventTypeTemplate = (name, isChecked) => {
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
