import MainTripInfoComponent from "./components/main-trip-info.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import FilterController from "./controllers/filter.js";
import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";

export const EVENT_COUNT = 1;

const siteHeaderElement = document.querySelector(`.page-header__container`);
const routeAndPriceElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const mainContentElement = document.querySelector(`.page-main .page-body__container`);
const siteMenuComponent = new SiteMenuComponent();
const events = generateEvents(EVENT_COUNT);
const pointsModel = new PointsModel();
const filterController = new FilterController(tripControlsElement, pointsModel);
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent, pointsModel);

render(routeAndPriceElement, new MainTripInfoComponent(events), RenderPosition.AFTERBEGIN);
render(tripControlsElement, siteMenuComponent, RenderPosition.BEFOREEND);

pointsModel.setPoints(events);
filterController.render();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});

render(mainContentElement, boardComponent, RenderPosition.BEFOREEND);
tripController.render();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setActiveItem(MenuItem.TABLE);
      tripController.createPoint();
      break;
    case MenuItem.STATS:
      siteMenuComponent.setActiveItem(MenuItem.STATS);
      tripController.createPoint();
      break;
  }
});
