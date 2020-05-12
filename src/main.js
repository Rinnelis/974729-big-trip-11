import MainTripInfoComponent from "./components/main-trip-info.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";

export const EVENT_COUNT = 15;

const siteHeaderElement = document.querySelector(`.page-header__container`);
const routeAndPriceElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const mainContentElement = document.querySelector(`.page-main .page-body__container`);

render(routeAndPriceElement, new MainTripInfoComponent(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterComponent(), RenderPosition.BEFOREEND);

const events = generateEvents(EVENT_COUNT);

const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent);

render(mainContentElement, boardComponent, RenderPosition.BEFOREEND);
tripController.render(events);
