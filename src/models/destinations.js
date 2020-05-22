export default class DestinationsList {
  constructor() {
    this._destinations = null;
  }

  static setList(destinations) {
    DestinationsList._destinations = destinations;
  }

  static getList() {
    return DestinationsList._destinations;
  }
}
