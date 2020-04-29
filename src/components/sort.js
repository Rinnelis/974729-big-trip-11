import AbstractComponent from "./abstract-component.js";

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

const createSortMarkup = (name, isChecked) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input 
        id="sort-${name}" 
        class="trip-sort__input  visually-hidden" 
        type="radio" 
        name="trip-sort" 
        value="sort-${name}" 
        data-sort-type="${name}"
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-sort__btn" for="sort-${name}"
        >${name}</label
      >
    </div>`
  );
};

const createSortTemplate = () => {
  const sortsMarkup = Object.values(SortType).map((sort, i) => createSortMarkup(sort, i === 0)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortsMarkup}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.EVENT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
