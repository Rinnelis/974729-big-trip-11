import AbstractComponent from "./abstract-component.js";
import MainTripRouteComponent from "./main-trip-route.js";
import MainTripPriceComponent from "./main-trip-price.js";

const createMainTripInfoTemplate = () => {
  const routeMarkup = new MainTripRouteComponent().getElement();
  const priceMarkup = new MainTripPriceComponent().getElement();

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${routeMarkup.outerHTML}
      ${priceMarkup.outerHTML}
    </section>`
  );
};

export default class MainTripInfo extends AbstractComponent {
  getTemplate() {
    return createMainTripInfoTemplate();
  }
}
