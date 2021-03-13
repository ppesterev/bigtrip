import * as api from "../api";
import * as actions from "./actions";

export const setEventOptions = () => (dispatch, getState) => {
  const token = getState().token;
  return Promise.all([
    api.getOffers(token),
    api.getDestinations(token)
  ]).then(([offers, destinations]) =>
    dispatch(actions.setOptions(offers, destinations))
  );
};

export const setEvents = () => (dispatch, getState) => {
  return api
    .getEvents(getState().token)
    .then((res) => dispatch(actions.setEvents(res)));
};

export const addEvent = (event) => (dispatch, getState) => {
  return api
    .createEvent(event, getState().token)
    .then((createdEvent) => dispatch(actions.addEvent(createdEvent)));
};

export const updateEvent = (id, event) => (dispatch, getState) => {
  return api
    .updateEvent(id, event, getState().token)
    .then((updatedEvent) => dispatch(actions.updateEvent(id, updatedEvent)));
};

export const deleteEvent = (id) => (dispatch, getState) => {
  return api
    .deleteEvent(id, getState().token)
    .then(() => dispatch(actions.deleteEvent(id)));
};

export {
  editEvent,
  stopEditing,
  switchView,
  setFilter,
  setSorting,
  setToken
} from "./actions";
