export const ActionType = {
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

export const setEventOptions = (offers, destinations) =>
  createAction(ActionType.SET_EVENT_OPTIONS, { offers, destinations });
export const setEvents = (events) =>
  createAction(ActionType.SET_EVENTS, { events });

export const addEvent = (event) =>
  createAction(ActionType.ADD_EVENT, { event });
export const updateEvent = (id, event) =>
  createAction(ActionType.UPDATE_EVENT, { id, event });
export const deleteEvent = (id) =>
  createAction(ActionType.DELETE_EVENT, { id });

export const sync = () => createAction(ActionType.SYNC, null);

export const editEvent = (id) => createAction(ActionType.EDIT_EVENT, { id });
export const stopEditing = () => createAction(ActionType.STOP_EDITING, null);

export const setView = (view) => createAction(ActionType.SET_VIEW, { view });
export const setFilter = (filter) =>
  createAction(ActionType.SET_FILTER, { filter });
export const setSorting = (sorting) =>
  createAction(ActionType.SET_SORTING, { sorting });
