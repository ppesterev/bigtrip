import React from "react";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import shapes from "../shapes";

function TripInfo({ events }) {
  if (!events || events.length === 0) {
    return (
      <section className="trip-main__trip-info  trip-info">
        <p className="trip-info__cost">
          Total: &euro;&nbsp;
          <span className="trip-info__cost-value">0</span>
        </p>
      </section>
    );
  }

  let orderedEvents = events
    .slice()
    .sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());

  const getTotalCost = () =>
    events.reduce((acc, event) => {
      return (
        acc +
        event.basePrice +
        event.offers.reduce((acc, offer) => acc + offer.price, 0)
      );
    }, 0);

  const startDate = dayjs(orderedEvents[0].dateFrom);
  const endDate = dayjs(orderedEvents[orderedEvents.length - 1].dateTo);

  return (
    <section className="trip-main__trip-info  trip-info">
      <div className="trip-info__main">
        <h1 className="trip-info__title">
          {orderedEvents[0].destination.name} &mdash; ... &mdash;{" "}
          {orderedEvents[orderedEvents.length - 1].destination.name}
        </h1>

        <p className="trip-info__dates">
          {startDate.format("MMM D")}&nbsp;&mdash;&nbsp;
          {endDate.isSame(startDate, "month")
            ? endDate.format("D")
            : endDate.format("MMM D")}
        </p>
      </div>

      <p className="trip-info__cost">
        Total: &euro;&nbsp;
        <span className="trip-info__cost-value">{getTotalCost()}</span>
      </p>
    </section>
  );
}

TripInfo.propTypes = {
  events: PropTypes.arrayOf(shapes.event)
};

export default TripInfo;
