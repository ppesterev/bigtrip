import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import EventSublist from "./EventSublist";
import SortForm from "./SortForm";
import EventForm from "./event-form/EventForm";

import shapes from "../shapes";
import { FilterOptions, SortOptions } from "../const";

function EventList({
  events,
  destinations,
  offers,
  currentlyEditing,
  filteredBy,
  setEditing,
  updateEvent
}) {
  const [activeSorting, setActiveSorting] = useState(SortOptions.DEFAULT);

  let sorter = null;
  switch (activeSorting) {
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
  switch (filteredBy) {
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

  if (activeSorting === SortOptions.DEFAULT) {
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
      <SortForm
        activeSorting={activeSorting}
        onSortingSelected={setActiveSorting}
      />

      {currentlyEditing.addingNew && (
        <EventForm {...{ destinations, offers, setEditing, updateEvent }} />
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
                currentlyEditing,
                setEditing,
                updateEvent
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(shapes.event),
  destinations: PropTypes.arrayOf(shapes.destination),
  offers: PropTypes.arrayOf(shapes.offer),

  currentlyEditing: PropTypes.shape({
    id: PropTypes.string,
    addingNew: PropTypes.bool
  }),
  filteredBy: PropTypes.oneOf(Object.values(FilterOptions)),
  setEditing: PropTypes.func,
  updateEvent: PropTypes.func
};

export default EventList;
