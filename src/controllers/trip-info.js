import {RenderPosition, render, replace} from '../utils/render.js';
import MainTripInfo from '../components/main-trip-info.js';

export default class TripInfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._component = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._component;
    this._component = new MainTripInfo(this._pointsModel);

    if (oldComponent) {
      replace(this._component, oldComponent);
    } else {
      render(container, this._component, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}
