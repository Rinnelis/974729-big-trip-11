import AbstractComponent from "./abstract-component.js";

const createBoardTemplate = () => {
  return (
    `<section class="trip-events"></section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
