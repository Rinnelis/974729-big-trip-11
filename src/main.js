import {createMainTripInfoTemplate} from "./components/main-trip-info.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortingTemplate} from "./components/sorting.js";
import {generateOffers} from "./mock/offer.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createEventItemTemplate} from "./components/event-item.js";

const EVENT_COUNT = 15;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header__container`);
const routeAndPriceElement = siteHeaderElement.querySelector(`.trip-main`);

render(routeAndPriceElement, createMainTripInfoTemplate(), `afterbegin`);

const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);

render(tripControlsElement, createSiteMenuTemplate());
render(tripControlsElement, createFilterTemplate());

const siteMainElement = document.querySelector(`.page-main`);
const mainContentElement = siteMainElement.querySelector(`.trip-events`);

render(mainContentElement, createSortingTemplate());

const offers = generateOffers();

render(mainContentElement, createEventEditTemplate(offers));

for (let i = 0; i < EVENT_COUNT; i++) {
  render(mainContentElement, createEventItemTemplate(offers));
}
