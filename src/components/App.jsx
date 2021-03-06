import React, { useState } from "react";
import PropTypes from "prop-types";

import Menu from "./Menu";
import FilterForm from "./FilterForm";
import TripInfo from "./TripInfo";
import EventList from "./EventList";

import shapes from "../shapes";
import { nanoid } from "nanoid";
import { FilterOptions, Views } from "../const";

function App({ data: { events: receivedEvents, destinations, offers } }) {
  const [events, setEvents] = useState(receivedEvents);

  const [currentlyEditing, setCurrentlyEditing] = useState({
    addingNew: false,
    id: null
  });

  const [view, setView] = useState(Views.HOME);

  const [filteredBy, setFilteredBy] = useState(FilterOptions.DEFAULT);

  const setEditing = (id, addingNew = false) => {
    setCurrentlyEditing({ addingNew, id });
  };

  const updateEvent = (id, updatedEvent) => {
    if (!id) {
      setEvents(events.concat({ id: nanoid(), ...updatedEvent }));
    } else if (!updatedEvent) {
      setEvents(events.filter((event) => event.id !== id));
    } else {
      setEvents(
        events.map((event) => (event.id === id ? updatedEvent : event))
      );
    }
  };

  return (
    <>
      <header className="page-header">
        <div className="page-body__container  page-header__container">
          <img
            className="page-header__logo"
            src="img/logo.png"
            width="42"
            height="42"
            alt="Trip logo"
          />

          <div className="trip-main">
            <TripInfo events={events} />
            <div className="trip-main__trip-controls  trip-controls">
              <h2 className="visually-hidden">Switch trip view</h2>
              <Menu {...{ activeView: view, setView }} />
              <h2 className="visually-hidden">Filter events</h2>
              <FilterForm {...{ filteredBy, setFilteredBy }} />
            </div>
            <button
              className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
              type="button"
              onClick={() => setEditing(null, !currentlyEditing.addingNew)}
            >
              New event
            </button>
          </div>
        </div>
      </header>

      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          {view === Views.HOME && (
            <section className="trip-events">
              <h2 className="visually-hidden">Trip events</h2>

              {(events && events.length > 0) || currentlyEditing.addingNew ? (
                <EventList
                  {...{
                    events,
                    destinations,
                    offers,
                    currentlyEditing,
                    filteredBy,
                    setEditing,
                    updateEvent
                  }}
                />
              ) : (
                <p className="trip-events__msg">
                  Click New Event to create your first point
                </p>
              )}
            </section>
          )}
          {view === Views.STATS && (
            <section className="statistics">
              <h2 className="visually-hidden">Trip statistics</h2>

              <div className="statistics__item statistics__item--money">
                <canvas
                  className="statistics__chart  statistics__chart--money"
                  width="900"
                ></canvas>
              </div>

              <div className="statistics__item statistics__item--transport">
                <canvas
                  className="statistics__chart  statistics__chart--transport"
                  width="900"
                ></canvas>
              </div>

              <div className="statistics__item statistics__item--time-spend">
                <canvas
                  className="statistics__chart  statistics__chart--time"
                  width="900"
                ></canvas>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

App.propTypes = {
  data: PropTypes.shape({
    offers: PropTypes.arrayOf(shapes.offer),
    destinations: PropTypes.arrayOf(shapes.destination),
    events: PropTypes.arrayOf(shapes.event)
  })
};

export default App;
