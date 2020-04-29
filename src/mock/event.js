import {getRandomNumber, getRandomMassiveComponent} from "../utils/common.js";

const EVENT_CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

const EVENT_TRANSFER_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

const EVENT_ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const additionalOffers = [{
  type: `luggage`,
  name: `Add luggage`,
}, {
  type: `comfort`,
  name: `Switch to comfort class`,
}, {
  type: `meal`,
  name: `Add meal`,
}, {
  type: `seats`,
  name: `Choose seats`,
}, {
  type: `train`,
  name: `Travel by train`,
}];

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Cras aliquet varius magna, non porta ligula feugiat eget. 
Fusce tristique felis at fermentum pharetra. 
Aliquam id orci ut lectus varius viverra. 
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`;


const generateEvent = () => {
  return {
    city: getRandomMassiveComponent(EVENT_CITIES),
    transferTypes: EVENT_TRANSFER_TYPES,
    activityTypes: EVENT_ACTIVITY_TYPES,
    time: `${getRandomNumber(0, 24)}:${getRandomNumber(0, 61)}`,
    duration: getRandomNumber(1, 60),
    price: getRandomNumber(100, 1000),
    description: descriptionText,
    offers: additionalOffers,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {EVENT_CITIES, generateEvent, generateEvents};
