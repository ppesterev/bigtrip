import * as api from "../api/network";
import * as storage from "../api/storage";
import * as actions from "./actions";

function isOnline() {
  return window.navigator.onLine;
}

export const setEventOptions = () => (dispatch, getState) => {
  const token = getState().token;
  if (isOnline()) {
    return Promise.all([api.getOffers(token), api.getDestinations(token)]).then(
      ([offers, destinations]) => {
        dispatch(actions.setOptions(offers, destinations));
        storage.setEventOptions(offers, destinations);
      }
    );
  }

  return Promise.resolve(storage.getEventOptions()).then((options) =>
    dispatch(actions.setOptions(options.offers, options.destinations))
  );
};

export const setEvents = () => (dispatch, getState) => {
  if (isOnline()) {
    return api.getEvents(getState().token).then((events) => {
      dispatch(actions.setEvents(events));
      storage.setEvents(events);
    });
  }

  return Promise.resolve(storage.getEvents()).then((events) =>
    dispatch(actions.setEvents(events))
  );
};

export const addEvent = (event) => (dispatch, getState) => {
  return api
    .createEvent(event, getState().token)
    .then((createdEvent) => dispatch(actions.addEvent(createdEvent)));
};

export const updateEvent = (id, event) => (dispatch, getState) => {
  storage.updateEvent(id, event);
  if (isOnline()) {
    return api
      .updateEvent(id, event, getState().token)
      .then((updatedEvent) => dispatch(actions.updateEvent(id, updatedEvent)));
  }

  return Promise.resolve(event).then((event) =>
    dispatch(actions.updateEvent(id, event))
  );
};

export const deleteEvent = (id) => (dispatch, getState) => {
  storage.deleteEvent(id);
  if (isOnline()) {
    return api
      .deleteEvent(id, getState().token)
      .then(() => dispatch(actions.deleteEvent(id)));
  }

  return Promise.resolve().then(() => dispatch(actions.deleteEvent(id)));
};

export {
  editEvent,
  stopEditing,
  setView,
  setFilter,
  setSorting,
  setToken
} from "./actions";
