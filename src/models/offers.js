let _offers = null;

export default class OffersList {
  static setList(offers) {
    _offers = offers;
  }

  static getList() {
    return _offers;
  }
}
