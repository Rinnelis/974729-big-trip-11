import AbstractComponent from "./abstract-component.js";

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
      <label class="trip-filters__filter-label" for="filter-${name}"
        >${name}</label
      >
    </div>`
  );
};

const createFilterTemplate = () => {
  const filtersMarkup = [`everything`, `future`, `past`].map((filter, i) => createFilterMarkup(filter, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }
}
