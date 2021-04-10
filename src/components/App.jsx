import React, { useEffect, useState, useMemo } from "react";

import Menu from "./Menu";
import FilterForm from "./FilterForm";
import TripInfo from "./TripInfo";
import EventList from "./EventList";
import StatsView from "./stats/StatsView";

import { FilterOption, SortOption, View } from "../const";

import useAsyncStore from "../hooks/use-async-store";
import useExtendedReducer from "../hooks/use-extended-reducer";
import reducer from "../store/reducer";
import withProvider from "../middleware/with-provider";
import initialState from "../store/initial-state";

import {
  setEventOptions,
  setEvents,
  setToken,
  setFilter,
  setSorting,
  editEvent,
  sync
} from "../store/actions";

const PAGE_TITLE = "Big Trip";

function App() {
  const [store, dispatch] = useExtendedReducer(
    reducer,
    [withProvider()],
    initialState
  );
  const { events, destinations, offers, filter } = store;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([dispatch(setEventOptions()), dispatch(setEvents())]).then(
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLE + navigator.onLine ? "" : " [Offline]";

    const onOffline = () => {
      console.log("offline");
      document.title = PAGE_TITLE + " [Offline]";
    };
    const onOnline = () => {
      console.log("online");
      document.title = PAGE_TITLE;
      dispatch(sync());
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  const filteredEvents = useMemo(() => {
    let filteredEvents = {};
    filteredEvents[FilterOption.DEFAULT] = events;
    filteredEvents[FilterOption.FUTURE] = events.filter(
      (event) => event.dateFrom.getTime() > Date.now()
    );
    filteredEvents[FilterOption.PAST] = events.filter(
      (event) => event.dateTo.getTime() < Date.now()
    );
    return filteredEvents;
  }, [events]);

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
              <Menu {...{ activeView: store.view, dispatch }} />

              <h2 className="visually-hidden">Filter events</h2>
              <FilterForm
                {...{ filteredEvents, filter: store.filter, dispatch }}
              />
            </div>

            <button
              className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
              type="button"
              disabled={store.editedEvent?.id === null}
              onClick={() => {
                dispatch(setSorting(SortOption.DEFAULT));
                dispatch(setFilter(FilterOption.DEFAULT));
                dispatch(editEvent(null));
              }}
            >
              New event
            </button>
          </div>
        </div>
      </header>

      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          {store.view === View.HOME && (
            <section className="trip-events">
              <h2 className="visually-hidden">Trip events</h2>

              {(events && events.length > 0) || store.editedEvent ? (
                <EventList
                  {...{
                    events: filteredEvents[filter],
                    destinations,
                    offers,
                    sorting: store.sorting,
                    editedEvent: store.editedEvent,
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
          {store.view === View.STATS && <StatsView {...{ events }} />}
        </div>
      </main>
    </>
  );
}

export default App;
