import * as api from "../api/network";
import * as storage from "../api/storage";
import * as actions from "./actions";

import TripEvent from "../models/TripEvent";
import OfferCollection from "../models/OfferCollection";
import DestinationCollection from "../models/Destination";

function isOnline() {
  return window.navigator.onLine;
}

export const setEventOptions = () => (dispatch, getState) => {
  const token = getState().token;
  if (isOnline()) {
    return Promise.all([api.getOffers(token), api.getDestinations(token)]).then(
      ([offers, destinations]) => {
        storage.setEventOptions(offers, destinations);
        dispatch(
          actions.setOptions(
            OfferCollection.toLocalShape(offers),
            DestinationCollection.toLocalShape(destinations)
          )
        );
      }
    );
  }

  return Promise.resolve(storage.getEventOptions()).then((options) =>
    dispatch(
      actions.setOptions(
        OfferCollection.toLocalShape(options.offers),
        DestinationCollection.toLocalShape(options.destinations)
      )
    )
  );
};

export const setEvents = () => (dispatch, getState) => {
  if (isOnline()) {
    return api.getEvents(getState().token).then((events) => {
      storage.setEvents(events);
      dispatch(actions.setEvents(events.map(TripEvent.toLocalShape)));
    });
  }

  return Promise.resolve(storage.getEvents()).then((events) =>
    dispatch(actions.setEvents(events.map(TripEvent.toLocalShape)))
  );
};

export const addEvent = (event) => (dispatch, getState) => {
  if (isOnline()) {
    return api
      .createEvent(TripEvent.toRemoteShape(event), getState().token)
      .then((createdEvent) => {
        storage.updateEvent(createdEvent.id, createdEvent);
        dispatch(actions.addEvent(TripEvent.toLocalShape(createdEvent)));
      });
  }

  return Promise.resolve(
    storage.createEvent(TripEvent.toRemoteShape(event))
  ).then((event) => dispatch(actions.addEvent(TripEvent.toLocalShape(event))));
};

export const updateEvent = (id, event) => (dispatch, getState) => {
  if (isOnline()) {
    return api
      .updateEvent(id, TripEvent.toRemoteShape(event), getState().token)
      .then((updatedEvent) => {
        storage.updateEvent(id, updatedEvent);
        dispatch(actions.updateEvent(id, TripEvent.toLocalShape(updatedEvent)));
      });
  }

  storage.updateEvent(id, TripEvent.toRemoteShape(event));
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
      dispatch(actions.setEvents(syncedEvents.map(TripEvent.toLocalShape)));
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
