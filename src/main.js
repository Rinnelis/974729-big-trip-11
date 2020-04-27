import MainTripInfoComponent from "./components/main-trip-info.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import TripController from "./controllers/trip.js";
import {render, RenderPosition} from "./utils/render.js";

const siteHeaderElement = document.querySelector(`.page-header__container`);
const routeAndPriceElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const mainContentElement = siteMainElement.querySelector(`.trip-events`);

render(routeAndPriceElement, new MainTripInfoComponent(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterComponent(), RenderPosition.BEFOREEND);
render(mainContentElement, new SortComponent(), RenderPosition.BEFOREEND);

const tripController = new TripController(mainContentElement);
tripController.render();
