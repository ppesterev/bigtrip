import { ActionType } from "./actions";

function eventReducer(events, action) {
  switch (action.type) {
    case ActionType.SET_EVENTS:
      return action.payload.events.slice();

    case ActionType.ADD_EVENT:
      return events.concat(action.payload.event);

    case ActionType.UPDATE_EVENT:
      return events.map((event) =>
        event.id === action.payload.id ? action.payload.event : event
      );

    case ActionType.DELETE_EVENT:
      return events.filter((event) => event.id !== action.payload.id);
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case ActionType.SET_EVENT_OPTIONS:
      return {
        ...state,
        offers: action.payload.offers,
        destinations: action.payload.destinations
      };
    case ActionType.EDIT_EVENT:
      return {
        ...state,
        editedEvent: { id: action.payload.id }
      };
    case ActionType.STOP_EDITING:
      return {
        ...state,
        editedEvent: null
      };
    case ActionType.SET_VIEW:
      return {
        ...state,
        view: action.payload.view
      };
    case ActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
    case ActionType.SET_SORTING:
      return {
        ...state,
        sorting: action.payload.sorting
      };
  }
  return {
    ...state,
    events: eventReducer(state.events, action)
  };
}
