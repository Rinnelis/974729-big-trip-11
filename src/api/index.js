import Point from "../models/point.js";
import OffersList from "../models/offers.js";
import DestinationsList from "../models/destinations.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({
      url: `points`
    })
    .then((response) => response.json())
    .then(Point.parsePoints);
  }

  getDestinations() {
    return this._load({
      url: `destinations`
    })
    .then((response) => response.json())
    .then(DestinationsList.setList);
  }

  getOffers() {
    return this._load({
      url: `offers`
    })
    .then((response) => response.json())
    .then(OffersList.setList);
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((response) => response.json())
    .then(Point.parsePoint);
  }

  updatePoint(id, point) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  sync(point) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
