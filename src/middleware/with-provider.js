import { ActionType } from "../store/actions";
import * as actions from "../store/actions";
import APIProvider from "../provider";

export default function withProvider(provider = new APIProvider()) {
  return ({ dispatch, getState }) => (next) => (action) => {
    switch (action.type) {
      case ActionType.SET_EVENT_OPTIONS:
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
      case ActionType.SET_EVENTS:
        return provider
          .getEvents()
          .then((events) => next(actions.setEvents(events)));
      case ActionType.ADD_EVENT:
        return provider
          .createEvent(action.payload.event)
          .then((event) => next(actions.addEvent(event)));
      case ActionType.UPDATE_EVENT:
        return provider
          .updateEvent(action.payload.id, action.payload.event)
          .then((event) => next(actions.updateEvent(action.payload.id, event)));
      case ActionType.DELETE_EVENT:
        return provider.deleteEvent(action.payload.id).then(() => next(action));
      case ActionType.SYNC:
        return provider
          .synchronize()
          .then((events) => next(actions.setEvents(events)));
      default:
        return Promise.resolve(next(action));
    }
  };
}
