import API from "./api.js";
import MainTripInfoComponent from "./components/main-trip-info.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import FilterController from "./controllers/filter.js";
import StatisticsComponent from "./components/statistics.js";
import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import {render, RenderPosition} from "./utils/render.js";

const AUTHORIZATION = `Basic lsddsbgsbdHJTFvjV=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);
const siteHeaderElement = document.querySelector(`.page-header__container`);
const tripHeader = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const mainContentElement = document.querySelector(`.page-main .page-body__container`);
const siteMenuComponent = new SiteMenuComponent();
const pointsModel = new PointsModel();
const mainTripInfoComponent = new MainTripInfoComponent(pointsModel.getPointsAll());
const filterController = new FilterController(tripControlsElement, pointsModel);
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent, pointsModel, api);

render(tripHeader, mainTripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripControlsElement, siteMenuComponent, RenderPosition.BEFOREEND);

filterController.render();

const statisticsComponent = new StatisticsComponent(pointsModel);
render(mainContentElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

export const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
newEventButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

render(mainContentElement, boardComponent, RenderPosition.BEFOREEND);

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
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
