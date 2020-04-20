const createSortingMarkup = (name, isChecked) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input 
        id="sort-${name}" 
        class="trip-sort__input  visually-hidden" 
        type="radio" 
        name="trip-sort" 
        value="sort-${name}" 
        ${isChecked ? `checked` : ``}
      >
      <label class="trip-sort__btn" for="sort-${name}"
        >${name}</label
      >
    </div>`
  );
};

export const createSortingTemplate = () => {
  const sortsMarkup = [`event`, `time`, `price`].map((sort, i) => createSortingMarkup(sort, i === 0)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortsMarkup}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};
