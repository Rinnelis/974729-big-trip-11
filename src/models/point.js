export default class Point {
  constructor(data) {
    this.id = data[`id`] || ``;
    this.type = data[`type`];
    this.city = data[`destination`][`name`];
    this.description = data[`destination`][`description`];
    this.price = data[`base_price`];
    this.start = new Date(data[`date_from`]);
    this.end = new Date(data[`date_to`]);
    this.offers = data[`offers`];
    this.pictures = data[`destination`][`pictures`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.start.toISOString(),
      'date_to': this.end.toISOString(),
      'destination': {
        'pictures': this.pictures,
        'description': this.description,
        'name': this.city,
      },
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.offers,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
