import MainTripInfoComponent from "./components/main-trip-info.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import EventEditComponent from "./components/event-edit.js";
import EventItemComponent from "./components/event-item.js";
import NoEventsComponent from "./components/no-events.js";
import {render, RenderPosition} from "./utils.js";

const EVENT_COUNT = 15;
const ZERO_EVENTS = 0;

const siteHeaderElement = document.querySelector(`.page-header__container`);
const routeAndPriceElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const mainContentElement = siteMainElement.querySelector(`.trip-events`);

render(routeAndPriceElement, new MainTripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(mainContentElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

if (EVENT_COUNT === ZERO_EVENTS) {
  render(mainContentElement, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < EVENT_COUNT; i++) {
  const replaceEventToEdit = () => {
    mainContentElement.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    mainContentElement.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventItemComponent = new EventItemComponent();
  const rollupButton = eventItemComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EventEditComponent();
  const saveButton = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  saveButton.addEventListener(`click`, () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(mainContentElement, eventItemComponent.getElement(), RenderPosition.BEFOREEND);
}
