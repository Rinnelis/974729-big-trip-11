import {getRandomNumber, getRandomMassiveComponent} from "../utils/common.js";

const DAYS_PER_WEEK = 7;
const HOURS_PER_DAY = 24;
const TIME_FORMAT = 1000;
const MINUTES_PER_HOUR = 60;

const getRandomDate = () => {
  return (
    Date.now() + Math.floor(Math.random() * DAYS_PER_WEEK) * HOURS_PER_DAY * getRandomNumber(0, MINUTES_PER_HOUR) * MINUTES_PER_HOUR * TIME_FORMAT
  );
};

export const EVENT_TYPES = new Map([
  [`taxi`, `Taxi`],
  [`bus`, `Bus`],
  [`train`, `Train`],
  [`ship`, `Ship`],
  [`transport`, `Transport`],
  [`drive`, `Drive`],
  [`flight`, `Flight`],
  [`check-in`, `Check-in`],
  [`sightseeing`, `Sightseeing`],
  [`restaurant`, `Restaurant`]
]);

export const TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

export const Direction = {
  TO: `to`,
  IN: `in`,
};

const EVENT_CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

const additionalOffers = [{
  type: `luggage`,
  title: `Add luggage`,
  price: 25
}, {
  type: `comfort`,
  title: `Switch to comfort class`,
  price: 50
}, {
  type: `meal`,
  title: `Add meal`,
  price: 10
}, {
  type: `seats`,
  title: `Choose seats`,
  price: 5
}, {
  type: `train`,
  title: `Travel by train`,
  price: 100
}];

const getRandomOffers = () => {
  const currentOffers = [];

  for (let i = 0; i < getRandomNumber(0, 4); i++) {
    currentOffers.push(additionalOffers[i]);
  }

  return currentOffers;
};

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

const getRandomPhotos = () => {
  const currentPhotos = [];

  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    currentPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return currentPhotos;
};

const generateEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    city: getRandomMassiveComponent(EVENT_CITIES),
    type: getRandomMassiveComponent(TYPES),
    start: Math.min(startDate, endDate),
    end: Math.max(startDate, endDate),
    price: getRandomNumber(100, 1000),
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
    photos: getRandomPhotos(),
    offers: getRandomOffers(),
    isFavorite: Math.random() > 0.5,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent())
    .sort((current, next) => current.start - next.start);
};

export {EVENT_CITIES, generateEvent, generateEvents};
