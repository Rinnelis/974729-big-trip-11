import {FILTER_TYPE} from "../const.js";

export const getFutureEvents = (events) => {
  return events.filter((point) => point.start > Date.now());
};

export const getPastEvents = (events) => {
  return events.filter((point) => point.end < Date.now());
};

export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return events.sort((a, b) => a.start - b.start);
    case FILTER_TYPE.FUTURE:
      return getFutureEvents(events);
    case FILTER_TYPE.PAST:
      return getPastEvents(events);
  }

  return events;
};
