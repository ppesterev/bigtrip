import { ActionTypes } from "../store/actions";
import * as actions from "../store/actions";
import APIProvider from "../provider";

export default function withProvider(provider = new APIProvider()) {
  return ({ dispatch, getState }) => (next) => (action) => {
    switch (action.type) {
      case ActionTypes.SET_EVENT_OPTIONS:
        return provider
          .getEventOptions()
          .then((eventOptions) =>
            next(
              actions.setEventOptions(
                eventOptions.offers,
                eventOptions.destinations
              )
            )
          );
      case ActionTypes.SET_EVENTS:
        return provider
          .getEvents()
          .then((events) => next(actions.setEvents(events)));
      case ActionTypes.ADD_EVENT:
        return provider
          .createEvent(action.payload.event)
          .then((event) => next(actions.addEvent(event)));
      case ActionTypes.UPDATE_EVENT:
        return provider
          .updateEvent(action.payload.id, action.payload.event)
          .then((event) => next(actions.updateEvent(action.payload.id, event)));
      case ActionTypes.DELETE_EVENT:
        return provider.deleteEvent(action.payload.id).then(() => next(action));
      case ActionTypes.SYNC:
        return provider
          .synchronize()
          .then((events) => next(actions.setEvents(events)));
      default:
        return Promise.resolve(next(action));
    }
  };
}
