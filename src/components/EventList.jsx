import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import EventSublist from "./EventSublist";
import SortForm from "./SortForm";
import EventForm from "./event-form/EventForm";

import shapes from "../shapes";
import { FilterOptions, SortOptions } from "../const";

function EventList({
  store: { events, destinations, offers, filter, sorting, editedEvent },
  dispatch
}) {
  let sorter = null;
  switch (sorting) {
    case SortOptions.TIME:
      sorter = (a, b) =>
        b.dateTo.getTime() -
        b.dateFrom.getTime() -
        (a.dateTo.getTime() - a.dateFrom.getTime());
      break;

    case SortOptions.PRICE:
      sorter = (a, b) => b.basePrice - a.basePrice;
      break;

    default:
      sorter = (a, b) => a.dateFrom.getTime() - b.dateFrom.getTime();
  }

  let filterer = null; // lol
  switch (filter) {
    case FilterOptions.FUTURE:
      filterer = (event) => event.dateFrom.getTime() > Date.now();
      break;
    case FilterOptions.PAST:
      filterer = (event) => event.dateTo.getTime() < Date.now();
      break;
    default:
      filterer = () => true;
  }

  let sortedEvents = events.slice().filter(filterer).sort(sorter);

  // break the list of events into individual lists for each day
  const sublists = [];

  if (sorting === SortOptions.DEFAULT) {
    for (let i = 0; i < sortedEvents.length; i++) {
      if (
        // a ney day has started
        i === 0 ||
        !dayjs(sortedEvents[i - 1].dateFrom).isSame(
          sortedEvents[i].dateFrom,
          "day"
        )
      ) {
        // then add a new day object
        sublists.push({
          date: dayjs(sortedEvents[i].dateFrom).startOf("day"),
          events: []
        });
      }
      // push event into latest day object
      sublists[sublists.length - 1].events.push(sortedEvents[i]);
    }
  } else {
    sublists.push({
      events: sortedEvents
    });
  }

  return (
    <>
      <SortForm {...{ sorting, dispatch }} />

      {editedEvent?.id === null && (
        <EventForm {...{ destinations, offers, dispatch }} />
      )}

      <ul className="trip-days">
        {sublists.map((sublist, index) => (
          <li className="trip-days__item  day" key={index}>
            <div className="day__info">
              {sublist.date && (
                <>
                  <span className="day__counter">{index + 1}</span>
                  <time
                    className="day__date"
                    dateTime={sublist.date.format("YYYY-MM-DD")}
                  >
                    {sublist.date.format("MMM DD")}
                  </time>{" "}
                </>
              )}
            </div>
            <EventSublist
              {...{
                events: sublist.events,
                destinations,
                offers,
                editedEvent,
                dispatch
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

EventList.propTypes = {
  store: PropTypes.shape({
    events: PropTypes.arrayOf(shapes.event),
    destinations: PropTypes.arrayOf(shapes.destination),
    offers: PropTypes.arrayOf(shapes.offer),

    editedEvent: PropTypes.shape({ id: PropTypes.any }),

    filter: PropTypes.oneOf(Object.values(FilterOptions)),
    sorting: PropTypes.oneOf(Object.values(SortOptions))
  }),
  dispatch: PropTypes.func
};

export default EventList;
