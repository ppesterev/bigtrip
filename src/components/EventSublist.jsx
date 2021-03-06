import React from "react";
import PropTypes from "prop-types";

import EventCard from "./EventCard";
import EventForm from "./EventForm";

import shapes from "../shapes";

function EventSublist({
  events,
  destinations,
  offers,
  currentlyEditing,
  setEditing,
  updateEvent
}) {
  return (
    <ul className="trip-events__list">
      {events.map((event) => (
        <li className="trip-events__item" key={event.id}>
          {event.id === currentlyEditing.id ? (
            <EventForm
              {...{ event, destinations, offers, setEditing, updateEvent }}
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
  updateEvent: PropTypes.func
};

export default EventSublist;
