import { nanoid } from "nanoid";

import StorageAPI from "./storage";
import NetworkAPI from "./network-api";

import TripEvent from "../models/trip-event";
import OfferCollection from "../models/offer-collection";
import DestinationCollection from "../models/destination";

import { STORAGE_NAMESPACE } from "../const";

function isOnline() {
  return window.navigator.onLine;
}

export default class APIProvider {
  constructor(
    networkAPI = new NetworkAPI(),
    eventStorage = new StorageAPI(`${STORAGE_NAMESPACE}_events`),
    optionStorage = new StorageAPI(`${STORAGE_NAMESPACE}_options`)
  ) {
    this._networkAPI = networkAPI;
    this._eventStorage = eventStorage;
    this._optionStorage = optionStorage;

    let authToken = this._optionStorage.getItem("token");
    if (!authToken) {
      authToken = `Basic ${nanoid()}`;
      this._optionStorage.setItem("token", authToken);
    }
    this._networkAPI.setToken(authToken);
  }

  getEventOptions() {
    if (isOnline()) {
      return Promise.all([
        this._networkAPI.getOffers(),
        this._networkAPI.getDestinations()
      ]).then(([offers, destinations]) => {
        this._optionStorage.setItem("offers", offers);
        this._optionStorage.setItem("destinations", destinations);
        return {
          offers: OfferCollection.toLocalShape(offers),
          destinations: DestinationCollection.toLocalShape(destinations)
        };
      });
    }

    return Promise.resolve({
      offers: OfferCollection.toLocalShape(
        this._optionStorage.getItem("offers")
      ),
      destinations: DestinationCollection.toLocalShape(
        this._storage.getItem("destinations")
      )
    });
  }

  getEvents() {
    if (isOnline()) {
      return this._networkAPI.getEvents().then((events) => {
        this._eventStorage.setEntries(
          events.reduce((acc, event) => ({ ...acc, [event.id]: event }), {})
        );
        return events.map(TripEvent.toLocalShape);
      });
    }

    return Promise.resolve(
      Object.values(this._eventStorage.getEntries())
    ).then((events) => events.map(TripEvent.toLocalShape));
  }

  createEvent(event) {
    if (isOnline()) {
      return this._networkAPI
        .createEvent(TripEvent.toRemoteShape(event))
        .then((createdEvent) => {
          this._eventStorage.setItem(createdEvent.id, createdEvent);
          return TripEvent.toLocalShape(createdEvent);
        });
    }

    const createdEvent = {
      ...TripEvent.toRemoteShape(event),
      id: nanoid()
    };
    this._eventStorage.setItem(createdEvent.id, createdEvent);
    return Promise.resolve(TripEvent.toLocalShape(createdEvent));
  }

  updateEvent(id, event) {
    if (isOnline()) {
      return this._networkAPI
        .updateEvent(id, TripEvent.toRemoteShape(event))
        .then((updatedEvent) => {
          this._eventStorage.setItem(id, updatedEvent);
          return TripEvent.toLocalShape(updatedEvent);
        });
    }

    this._eventStorage.setItem(id, TripEvent.toRemoteShape(event));
    return Promise.resolve(event);
  }

  deleteEvent(id) {
    if (isOnline()) {
      return this._networkAPI.deleteEvent(id).then(() => {
        this._eventStorage.removeItem(id);
      });
    }

    this._eventStorage.removeItem(id);
    return Promise.resolve();
  }

  synchronize() {
    if (isOnline()) {
      const events = Object.values(this._eventStorage.getEntries());
      return this._networkAPI.sync(events).then((syncedEvents) => {
        this._eventStorage.setEntries(
          syncedEvents.reduce(
            (acc, event) => ({ ...acc, [event.id]: event }),
            {}
          )
        );
        return syncedEvents.map(TripEvent.toLocalShape);
      });
    }

    return Promise.reject("Sync failed");
  }
}
