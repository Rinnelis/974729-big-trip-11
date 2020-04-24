import MainTripInfoComponent from "./components/main-trip-info.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import EventEditComponent from "./components/event-edit.js";
import EventItemComponent from "./components/event-item.js";
import {render, RenderPosition} from "./utils.js";

const EVENT_COUNT = 15;

const siteHeaderElement = document.querySelector(`.page-header__container`);
const routeAndPriceElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const mainContentElement = siteMainElement.querySelector(`.trip-events`);

render(routeAndPriceElement, new MainTripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(mainContentElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  const onRollupButtonClick = () => {
    mainContentElement.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const onSaveButtonClick = (evt) => {
    evt.preventDefault();
    mainContentElement.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  const eventItemComponent = new EventItemComponent();
  const rollupButton = eventItemComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, onRollupButtonClick);

  const eventEditComponent = new EventEditComponent();
  const saveButton = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  saveButton.addEventListener(`click`, onSaveButtonClick);

  render(mainContentElement, eventItemComponent.getElement(), RenderPosition.BEFOREEND);
}
