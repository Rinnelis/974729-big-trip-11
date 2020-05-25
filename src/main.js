import API from "./api.js";
import TripInfoController from "./controllers/trip-info.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import FilterController from "./controllers/filter.js";
import StatisticsComponent from "./components/statistics.js";
import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import ListLoading from "./components/loading.js";
import {FILTER_TYPE} from "./const.js";
import {getEventsByFilter} from "./utils/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";

const AUTHORIZATION = `Basic ABabhgddvvdnkljvLL=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);
const siteHeaderElement = document.querySelector(`.page-header__container`);
const tripHeader = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const mainContentElement = document.querySelector(`.page-main .page-body__container`);
const pointsModel = new PointsModel();
const siteMenuComponent = new SiteMenuComponent();
const tripInfoController = new TripInfoController(tripHeader, pointsModel);
const filterController = new FilterController(tripControlsElement, pointsModel);
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent, pointsModel, api);
const statisticsComponent = new StatisticsComponent(pointsModel);
const loadingComponent = new ListLoading();

render(tripControlsElement, siteMenuComponent, RenderPosition.BEFOREEND);

tripInfoController.render();
filterController.render();
render(mainContentElement, loadingComponent, RenderPosition.BEFOREEND);

render(mainContentElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

export const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
newEventButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

render(mainContentElement, boardComponent, RenderPosition.BEFOREEND);

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers(),
  remove(loadingComponent)
]).then((res) => {
  pointsModel.setPoints(res[0]);
  Object.values(FILTER_TYPE).map((filter) => {
    const filteredPoints = getEventsByFilter(pointsModel.getPointsAll(), filter.toLowerCase());
    if (filteredPoints.length === 0) {
      return filterController.disableFilter(filter.toLowerCase());
    }
    return filterController.render();
  });
  tripController.render();
});

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setActiveItem(MenuItem.TABLE);
      tripController._sortComponent.show();
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      siteMenuComponent.setActiveItem(MenuItem.STATS);
      tripController._sortComponent.hide();
      tripController.hide();
      statisticsComponent.show();
      break;
  }
});
