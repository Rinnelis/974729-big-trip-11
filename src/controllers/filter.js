import FilterComponent from "../components/filter.js";
import {FILTER_TYPE} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FILTER_TYPE.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(this._activeFilterType);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultFilter() {
    this._pointsModel.setFilter(FILTER_TYPE.EVERYTHING);
    this._filterComponent.setActiveFilter(FILTER_TYPE.EVERYTHING);
  }

  disableFilter(filter) {
    this._filterComponent.switchStyle(filter);
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
