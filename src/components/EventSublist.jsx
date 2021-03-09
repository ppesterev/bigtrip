import React from "react";
import PropTypes from "prop-types";

import EventCard from "./EventCard";
import EventForm from "./event-form/EventForm";

import shapes from "../shapes";

function EventSublist({
  events,
  destinations,
  offers,
  currentlyEditing,
  setEditing,
  onEventChanged
}) {
  return (
    <ul className="trip-events__list">
      {events.map((event) => (
        <li className="trip-events__item" key={event.id}>
          {event.id === currentlyEditing.id ? (
            <EventForm
              {...{ event, destinations, offers, setEditing, onEventChanged }}
            />
          ) : (
            <EventCard {...{ event, setEditing }} />
          )}
        </li>
      ))}
    </ul>
  );
}

EventSublist.propTypes = {
  events: PropTypes.arrayOf(shapes.event),
  destinations: PropTypes.arrayOf(shapes.destination),
  offers: PropTypes.arrayOf(shapes.offer),

  currentlyEditing: PropTypes.shape({
    id: PropTypes.string,
    addingNew: PropTypes.bool
  }),
  setEditing: PropTypes.func,
  onEventChanged: PropTypes.func
};

export default EventSublist;
