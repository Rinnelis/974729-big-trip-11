let _destinations = null;

export default class DestinationsList {
  static setList(destinations) {
    _destinations = destinations;
  }

  static getList() {
    return _destinations;
  }
}
