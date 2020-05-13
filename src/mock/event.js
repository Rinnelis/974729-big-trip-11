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
  [`taxi`, `Taxi to`],
  [`bus`, `Bus to`],
  [`train`, `Train to`],
  [`ship`, `Ship to`],
  [`transport`, `Transport to`],
  [`drive`, `Drive to`],
  [`flight`, `Flight to`],
  [`check-in`, `Check-in in`],
  [`sightseeing`, `Sightseeing in`],
  [`restaurant`, `Restaurant in`]
]);

const TYPES = [
  `Taxi to`,
  `Bus to`,
  `Train to`,
  `Ship to`,
  `Transport to`,
  `Drive to`,
  `Flight to`,
  `Check-in in`,
  `Sightseeing in`,
  `Restaurant in`
];

const EVENT_CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

const additionalOffers = [{
  type: `luggage`,
  name: `Add luggage`,
  price: 25
}, {
  type: `comfort`,
  name: `Switch to comfort class`,
  price: 50
}, {
  type: `meal`,
  name: `Add meal`,
  price: 10
}, {
  type: `seats`,
  name: `Choose seats`,
  price: 5
}, {
  type: `train`,
  name: `Travel by train`,
  price: 100
}];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

const generateEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    city: getRandomMassiveComponent(EVENT_CITIES),
    type: EVENT_TYPES,
    start: Math.min(startDate, endDate),
    end: Math.max(startDate, endDate),
    price: getRandomNumber(100, 1000),
    description: DESCRIPTIONS,
    offers: additionalOffers,
    isFavorite: Math.random() > 0.5,
    typeItem: getRandomMassiveComponent(TYPES)
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent())
    .sort((current, next) => current.start - next.start);
};

export {EVENT_CITIES, generateEvent, generateEvents};
