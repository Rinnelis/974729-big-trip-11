import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (name, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input 
        id="filter-${name}" 
        class="trip-filters__filter-input  visually-hidden" 
        type="radio" 
        name="trip-filter" 
        value="${name}" 
        ${isChecked ? `checked` : ``}
      />
      <label id="${name}" class="trip-filters__filter-label" for="filter-${name}"
        >${name}</label
      >
    </div>`
  );
};

const createFilterTemplate = (choosenFilter) => {
  const filtersMarkup = [`everything`, `future`, `past`].map((filter) => createFilterMarkup(filter, filter === choosenFilter)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }

  setActiveFilter(filter) {
    const element = this.getElement().querySelector(`#filter-${filter}`);

    if (element) {
      element.checked = true;
    }
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

  switchStyle(filter) {
    this.getElement().querySelector(`#filter-${filter}`).setAttribute(`disabled`, `disabled`);
  }
}
