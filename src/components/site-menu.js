import AbstractComponent from "./abstract-component.js";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

export const MenuItem = {
  TABLE: `control-table`,
  STATS: `control-stats`
};

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a id="control-table" class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a id="control-stats" class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }

  setActiveItem(menuItem) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`)
      .forEach((item) => {
        if (item.id === menuItem) {
          item.classList.add(ACTIVE_CLASS);
        } else {
          item.classList.remove(ACTIVE_CLASS);
        }
      });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      evt.preventDefault();

      const menuItem = evt.target.id;
      handler(menuItem);
    });
  }
}
