import React from "react";
import PropTypes from "prop-types";

import EventCard from "./EventCard";
import EventForm from "./event-form/EventForm";

import shapes from "../shapes";

function EventSublist({ events, destinations, offers, editedEvent, dispatch }) {
  return (
    <ul className="trip-events__list">
      {events.map((event) => (
        <li className="trip-events__item" key={event.id}>
          {event.id === editedEvent?.id ? (
            <EventForm {...{ event, destinations, offers, dispatch }} />
          ) : (
            <EventCard {...{ event, dispatch }} />
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

  editedEvent: PropTypes.shape({
    id: PropTypes.any
  }),

  dispatch: PropTypes.func
};

export default EventSublist;
