export default class OffersList {
  constructor() {
    this._offers = null;
  }

  static setList(offers) {
    OffersList._offers = offers;
  }

  static getList() {
    return OffersList._offers;
  }
}
