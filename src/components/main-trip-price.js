import AbstractComponent from "./abstract-component.js";

const createMainTripPriceTemplate = (events) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${events.map((event) => event.price).reduce((sum, current) => sum + current, 0)}</span>
    </p>`
  );
};

export default class MainTripPrice extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }
  getTemplate() {
    return createMainTripPriceTemplate(this._events);
  }
}
