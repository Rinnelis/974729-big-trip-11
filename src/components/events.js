import AbstractComponent from "./abstract-component.js";

const createEventsTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class Events extends AbstractComponent {
  getTemplate() {
    return createEventsTemplate();
  }
}
