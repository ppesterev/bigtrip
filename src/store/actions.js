export const ActionTypes = {
  SET_TOKEN: "SET_TOKEN",
  SET_EVENT_OPTIONS: "SET_EVENT_OPTIONS",
  SET_EVENTS: "SET_EVENTS",

  ADD_EVENT: "ADD_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",

  SYNC: "SYNC",

  EDIT_EVENT: "EDIT_EVENT",
  STOP_EDITING: "STOP_EDITING",

  SET_VIEW: "SET_VIEW",
  SET_FILTER: "SET_FILTER",
  SET_SORTING: "SET_SORTING"
};

const createAction = (type, payload) => ({ type, payload });

export const setToken = (token) =>
  createAction(ActionTypes.SET_TOKEN, { token });
export const setEventOptions = (offers, destinations) =>
  createAction(ActionTypes.SET_EVENT_OPTIONS, { offers, destinations });
export const setEvents = (events) =>
  createAction(ActionTypes.SET_EVENTS, { events });

export const addEvent = (event) =>
  createAction(ActionTypes.ADD_EVENT, { event });
export const updateEvent = (id, event) =>
  createAction(ActionTypes.UPDATE_EVENT, { id, event });
export const deleteEvent = (id) =>
  createAction(ActionTypes.DELETE_EVENT, { id });

export const sync = () => createAction(ActionTypes.SYNC, null);

export const editEvent = (id) => createAction(ActionTypes.EDIT_EVENT, { id });
export const stopEditing = () => createAction(ActionTypes.STOP_EDITING, null);

export const setView = (view) => createAction(ActionTypes.SET_VIEW, { view });
export const setFilter = (filter) =>
  createAction(ActionTypes.SET_FILTER, { filter });
export const setSorting = (sorting) =>
  createAction(ActionTypes.SET_SORTING, { sorting });
