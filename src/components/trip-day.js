import AbstractComponent from "./abstract-component.js";
import moment from "moment";

const createDayTemplate = (date, index) => {
  let eventDay = ``;

  if (date && index) {
    const fullDate = moment(new Date(date)).format(`YYYY-MM-DDThh:mm`);
    const month = moment(new Date(date)).format(`MMM`);
    const day = moment(new Date(date)).format(`DD`);

    eventDay = `<span class="day__counter">${index}</span>
    <time class="day__date" datetime="${fullDate}">${month} ${day}</time>`;
  }

  return (
    `<div class="day__info">${eventDay}</div>`
  );
};

const createTripDaysTemplate = (start, index) => {
  const dayMarkup = createDayTemplate(start, index);
  return (
    `<li class="trip-days__item day">
      ${dayMarkup}
    </li>`
  );
};

export default class TripDays extends AbstractComponent {
  constructor(start, index) {
    super();
    this._start = start;
    this._index = index;
  }

  getTemplate() {
    return createTripDaysTemplate(this._start, this._index);
  }
}
