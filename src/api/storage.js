import { nanoid } from "nanoid";

const KEY_EVENTS = "events";
const KEY_OPTIONS = "options";

export function setEvents(events) {
  let storedEvents = {};
  for (const event of events) {
    storedEvents[event.id] = event;
  }
  localStorage.setItem(KEY_EVENTS, JSON.stringify(storedEvents));
}

export function getEvents() {
  let storedEvents = JSON.parse(localStorage.getItem(KEY_EVENTS));
  return Object.values(storedEvents);
}

export function setEventOptions(offers, destinations) {
  localStorage.setItem(KEY_OPTIONS, JSON.stringify({ offers, destinations }));
}

export function getEventOptions() {
  return JSON.parse(localStorage.getItem(KEY_OPTIONS));
}

export function createEvent(event) {
  let localEvent = { ...event, id: nanoid() };
  let storedEvents = {
    ...JSON.parse(localStorage.getItem(KEY_EVENTS)),
    [localEvent.id]: localEvent
  };
  localStorage.setItem(KEY_EVENTS, JSON.stringify(storedEvents));

  return localEvent;
}

export function updateEvent(id, event) {
  let storedEvents = {
    ...JSON.parse(localStorage.getItem(KEY_EVENTS)),
    [id]: event
  };
  localStorage.setItem(KEY_EVENTS, JSON.stringify(storedEvents));
}

export function deleteEvent(id) {
  let { [id]: discard, ...storedEvents } = JSON.parse(
    localStorage.getItem(KEY_EVENTS)
  );
  localStorage.setItem(KEY_EVENTS, JSON.stringify(storedEvents));
}
