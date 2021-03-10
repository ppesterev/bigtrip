import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Menu from "./Menu";
import FilterForm from "./FilterForm";
import TripInfo from "./TripInfo";
import EventList from "./EventList";
import StatsView from "./stats/StatsView";

import shapes from "../shapes";
import { FilterOptions, Views } from "../const";

import useAsyncStore from "../hooks/use-async-store";
import reducer from "../store/reducer";
import initialState from "../store/initial-state";
import { setEventOptions, setEvents, setToken } from "../store/operations";
import { getToken } from "../api";

function App() {
  const [store, dispatch] = useAsyncStore(reducer, initialState);
  const { events, destinations, offers } = store;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setToken(getToken()));
    setIsLoading(true);
    Promise.all([dispatch(setEventOptions()), dispatch(setEvents())]).then(
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const [currentlyEditing, setCurrentlyEditing] = useState({
    addingNew: false,
    id: null
  });

  const [view, setView] = useState(Views.HOME);
  const [activeFilter, setActiveFilter] = useState(FilterOptions.DEFAULT);

  const setEditing = (id, addingNew = false) => {
    setCurrentlyEditing({ addingNew, id });
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
              <Menu {...{ activeView: view, onViewSelected: setView }} />
              <h2 className="visually-hidden">Filter events</h2>
              <FilterForm
                {...{ activeFilter, onFilterSelected: setActiveFilter }}
              />
            </div>
            <button
              className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
              type="button"
              onClick={() => {
                setView(Views.HOME);
                setEditing(null, !currentlyEditing.addingNew);
              }}
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
                    activeFilter,
                    setEditing,
                    dispatch
                  }}
                />
              ) : isLoading ? (
                <p className="trip-events__msg">Loading...</p>
              ) : (
                <p className="trip-events__msg">
                  Click New Event to create your first point
                </p>
              )}
            </section>
          )}
          {view === Views.STATS && <StatsView {...{ events }} />}
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
