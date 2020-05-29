export default class Point {
  constructor(point) {
    this.id = point[`id`] || ``;
    this.type = point[`type`];
    this.city = point[`destination`][`name`];
    this.description = point[`destination`][`description`];
    this.price = point[`base_price`];
    this.start = new Date(point[`date_from`]);
    this.end = new Date(point[`date_to`]);
    this.offers = point[`offers`];
    this.pictures = point[`destination`][`pictures`];
    this.isFavorite = Boolean(point[`is_favorite`]);
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

  static parsePoint(point) {
    return new Point(point);
  }

  static parsePoints(point) {
    return point.map(Point.parsePoint);
  }

  static clone(point) {
    return new Point(point.toRAW());
  }
}
