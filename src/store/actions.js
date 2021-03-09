export const ActionTypes = {
  SET_EVENT_OPTIONS: "SET_EVENT_OPTIONS",
  SET_EVENTS: "SET_EVENTS",
  ADD_EVENT: "ADD_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  SWITCH_VIEW: "SWITCH_VIEW",
  SET_FILTER: "SET_FILTER",
  SET_SORTING: "SET_SORTING",
  SET_TOKEN: "SET_TOKEN"
};

const createAction = (type, payload) => ({ type, payload });

export const setOptions = (offers, destinations) =>
  createAction(ActionTypes.SET_EVENT_OPTIONS, { offers, destinations });

export const setEvents = (events) =>
  createAction(ActionTypes.SET_EVENTS, { events });
export const addEvent = (event) =>
  createAction(ActionTypes.ADD_EVENT, { event });
export const updateEvent = (id, event) =>
  createAction(ActionTypes.UPDATE_EVENT, { id, event });
export const deleteEvent = (id) =>
  createAction(ActionTypes.DELETE_EVENT, { id });

export const switchView = (view) =>
  createAction(ActionTypes.SWITCH_VIEW, { view });
export const setFilter = (filter) =>
  createAction(ActionTypes.SET_FILTER, { filter });
export const setSorting = (sorting) =>
  createAction(ActionTypes.SET_SORTING, { sorting });

export const setToken = (token) =>
  createAction(ActionTypes.SET_TOKEN, { token });
