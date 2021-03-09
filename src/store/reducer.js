import { ActionTypes } from "./actions";

function eventReducer(events, action) {
  switch (action.type) {
    case ActionTypes.SET_EVENTS:
      return action.payload.events.slice();

    case ActionTypes.ADD_EVENT:
      return events.concat(action.payload.event);

    case ActionTypes.UPDATE_EVENT:
      return events.map((event) =>
        event.id === action.payload.id ? action.payload.event : event
      );

    case ActionTypes.DELETE_EVENT:
      return events.filter((event) => event.id !== action.payload.id);
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_EVENT_OPTIONS:
      return {
        ...state,
        offers: action.payload.offers,
        destinations: action.payload.destinations
      };
    case ActionTypes.SWITCH_VIEW:
      return {
        ...state,
        view: action.payload.view
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
    case ActionTypes.SET_SORTING:
      return {
        ...state,
        sorting: action.payload.sorting
      };
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
  }
  return {
    ...state,
    events: eventReducer(state.events, action)
  };
}
