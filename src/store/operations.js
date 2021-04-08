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
        storage.setEventOptions(offers, destinations);
        dispatch(actions.setOptions(offers, destinations));
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
      storage.setEvents(events);
      dispatch(actions.setEvents(events));
    });
  }

  return Promise.resolve(storage.getEvents()).then((events) =>
    dispatch(actions.setEvents(events))
  );
};

export const addEvent = (event) => (dispatch, getState) => {
  if (isOnline()) {
    return api.createEvent(event, getState().token).then((createdEvent) => {
      storage.updateEvent(createdEvent.id, createdEvent);
      dispatch(actions.addEvent(createdEvent));
    });
  }

  return Promise.resolve(storage.createEvent(event)).then((event) =>
    dispatch(actions.addEvent(event))
  );
};

export const updateEvent = (id, event) => (dispatch, getState) => {
  if (isOnline()) {
    return api.updateEvent(id, event, getState().token).then((updatedEvent) => {
      storage.updateEvent(id, updatedEvent);
      dispatch(actions.updateEvent(id, updatedEvent));
    });
  }

  storage.updateEvent(id, event);
  return Promise.resolve(event).then((event) =>
    dispatch(actions.updateEvent(id, event))
  );
};

export const deleteEvent = (id) => (dispatch, getState) => {
  if (isOnline()) {
    return api.deleteEvent(id, getState().token).then(() => {
      storage.deleteEvent(id);
      dispatch(actions.deleteEvent(id));
    });
  }

  storage.deleteEvent(id);
  return Promise.resolve().then(() => dispatch(actions.deleteEvent(id)));
};

export const sync = () => (dispatch, getState) => {
  if (isOnline()) {
    const events = storage.getEvents();
    return api.sync(events, getState().token).then((syncedEvents) => {
      storage.setEvents(syncedEvents);
      dispatch(actions.setEvents(syncedEvents));
    });
  }

  return Promise.reject("Sync failed");
};

export {
  editEvent,
  stopEditing,
  setView,
  setFilter,
  setSorting,
  setToken
} from "./actions";
