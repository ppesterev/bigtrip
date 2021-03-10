import React from "react";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import shapes from "../shapes";
import { capitalize, getTypeCategory } from "../utils";
import { TypeCategories } from "../const";

dayjs.extend(duration);

function EventCard({ event, setEditing }) {
  const totalCost =
    event.basePrice + event.offers.reduce((acc, offer) => acc + offer.price, 0);

  return (
    <div className="event">
      <div className="event__type">
        <img
          className="event__type-icon"
          width="42"
          height="42"
          src={`img/icons/${event.type}.png`}
          alt="Event type icon"
        />
      </div>
      <h3 className="event__title">
        {capitalize(event.type)}{" "}
        {getTypeCategory(event.type) === TypeCategories.ACTIVITY ? "in" : "to"}{" "}
        {event.destination.name}
      </h3>

      <div className="event__schedule">
        <p className="event__time">
          <time className="event__start-time" dateTime={event.dateFrom}>
            {dayjs(event.dateFrom).format("HH:mm")}
          </time>{" "}
          &mdash;{" "}
          <time className="event__end-time" dateTime={event.dateTo}>
            {dayjs(event.dateTo).format("HH:mm")}
          </time>
        </p>
        <p className="event__duration">
          {dayjs
            .duration(dayjs(event.dateTo).diff(dayjs(event.dateFrom)))
            .format("D[d] H[h] m[m]")
            .replaceAll(/\s?(?<![0-9])0[dhm]\s?/g, " ")
            .trim()}
        </p>
      </div>

      <p className="event__price">
        &euro;&nbsp;
        <span className="event__price-value">{totalCost}</span>
      </p>

      <h4 className="visually-hidden">Offers:</h4>
      <ul className="event__selected-offers">
        {event.offers.map((offer) => (
          <li className="event__offer" key={`${offer.title} - ${offer.price}`}>
            <span className="event__offer-title">{offer.title}</span>
            {"+"} &euro;&nbsp;
            <span className="event__offer-price">{offer.price}</span>
          </li>
        ))}
      </ul>

      <button
        className="event__rollup-btn"
        type="button"
        onClick={() => setEditing(event.id)}
      >
        <span className="visually-hidden">Open event</span>
      </button>
    </div>
  );
}

EventCard.propTypes = {
  event: shapes.event,
  setEditing: PropTypes.func
};

export default EventCard;
