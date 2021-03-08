import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import OfferSelector from "./OfferSelector";
import TypeSelector from "./TypeSelector";

import { capitalize, getTypeCategory } from "../../utils";
import { types, TypeCategories } from "../../const";
import shapes from "../../shapes";

function EventForm({ event, destinations, offers, setEditing, updateEvent }) {
  const doneEditing = () => setEditing(null);

  const [updatedEvent, setUpdatedEvent] = useState(
    event || {
      type: types[0],

      basePrice: 0,
      dateFrom: null,
      dateTo: null,

      destination: null,
      offers: [],

      isFavorite: false
    }
  );

  const destinationInput = useRef(null);

  const updateDestination = () => {
    const newDestination =
      destinations.find((dest) =>
        dest.name
          .toLowerCase()
          .startsWith(destinationInput.current.value.toLowerCase())
      ) || updatedEvent.destination;

    setUpdatedEvent({ ...updatedEvent, destination: newDestination });
    destinationInput.current.value = newDestination.name;
  };

  useEffect(() => {
    function closeOnEscape(evt) {
      if (evt.key === "Escape") {
        doneEditing();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  });

  return (
    <form
      className="trip-events__item  event  event--edit"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        if (!updatedEvent.dateFrom || !updatedEvent.dateTo) {
          return;
        } // more validation later

        updateEvent(event?.id, {
          ...updatedEvent,
          isFavorite: event?.isFavorite || false
        }); // favoriting is handled independently of saving
        doneEditing();
      }}
      onReset={() => {
        if (event) {
          updateEvent(event.id, null);
        }
        doneEditing();
      }}
    >
      <header className="event__header">
        <TypeSelector
          type={updatedEvent.type}
          onChange={(value) =>
            setUpdatedEvent({ ...updatedEvent, type: value, offers: [] })
          }
        />

        <div className="event__field-group  event__field-group--destination">
          <label
            className="event__label  event__type-output"
            htmlFor="event-destination-1"
          >
            {capitalize(updatedEvent.type)}{" "}
            {getTypeCategory(updatedEvent.type) === TypeCategories.ACTIVITY
              ? "in"
              : "to"}
          </label>
          <input
            ref={destinationInput}
            className="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            defaultValue={event?.destination?.name || ""}
            onBlur={updateDestination}
            list="destination-list-1"
            required
          />
          <datalist id="destination-list-1">
            {destinations.map((dest) => (
              <option value={dest.name} key={dest.name}></option>
            ))}
          </datalist>
        </div>

        <div className="event__field-group  event__field-group--time">
          <label className="visually-hidden" htmlFor="event-start-time-1">
            From
          </label>
          <Flatpickr
            data-enable-time
            className="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value={updatedEvent.dateFrom}
            onChange={(dates) =>
              setUpdatedEvent({ ...updatedEvent, dateFrom: dates[0] })
            }
            options={{
              dateFormat: "d/m/y H:i",
              maxDate: updatedEvent.dateTo
            }}
          />
          &mdash;
          <label className="visually-hidden" htmlFor="event-end-time-1">
            To
          </label>
          <Flatpickr
            data-enable-time
            className="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value={updatedEvent.dateTo}
            onChange={(dates) =>
              setUpdatedEvent({ ...updatedEvent, dateTo: dates[0] })
            }
            options={{
              dateFormat: "d/m/y H:i",
              minDate: updatedEvent.dateFrom
            }}
          />
        </div>

        <div className="event__field-group  event__field-group--price">
          <label className="event__label" htmlFor="event-price-1">
            <span className="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            className="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value={updatedEvent.basePrice}
            onChange={(evt) => {
              const newPrice = parseInt(evt.target.value) || 0;
              if (newPrice || newPrice === 0) {
                setUpdatedEvent({ ...updatedEvent, basePrice: newPrice });
              }
            }}
          />
        </div>

        <button className="event__save-btn  btn  btn--blue" type="submit">
          Save
        </button>
        <button className="event__reset-btn" type="reset">
          {event ? "Delete" : "Cancel"}
        </button>

        {/* Only if editing existing event */}
        {event && (
          <>
            <input
              id="event-favorite-1"
              className="event__favorite-checkbox  visually-hidden"
              type="checkbox"
              name="event-favorite"
              checked={event.isFavorite}
              onChange={(evt) =>
                updateEvent(event.id, {
                  ...event,
                  isFavorite: evt.target.checked
                })
              }
            />
            <label className="event__favorite-btn" htmlFor="event-favorite-1">
              <span className="visually-hidden">Add to favorite</span>
              <svg
                className="event__favorite-icon"
                width="28"
                height="28"
                viewBox="0 0 28 28"
              >
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
              </svg>
            </label>

            <button
              className="event__rollup-btn"
              type="button"
              onClick={doneEditing}
            >
              <span className="visually-hidden">Open event</span>
            </button>
          </>
        )}
      </header>
      <section className="event__details">
        <section className="event__section  event__section--offers">
          <h3 className="event__section-title  event__section-title--offers">
            Offers
          </h3>

          <div className="event__available-offers">
            {offers
              .filter((offer) => offer.type === updatedEvent.type)
              .map((offer) => (
                <OfferSelector
                  key={`${offer.title} - ${offer.price}`}
                  {...{
                    offer,
                    value: updatedEvent.offers.some(
                      // the event's selected offers include one just like this!
                      (eventOffer) =>
                        eventOffer.title === offer.title &&
                        eventOffer.price === offer.price
                    ),
                    onChange: (evt) => {
                      if (evt.target.checked) {
                        setUpdatedEvent((updatedEvent) => ({
                          ...updatedEvent,
                          offers: updatedEvent.offers.concat(offer)
                          // is this a problem? could we have a situation when this offer is already in?
                        }));
                      } else {
                        setUpdatedEvent((updatedEvent) => ({
                          ...updatedEvent,
                          offers: updatedEvent.offers.filter(
                            (eventOffer) =>
                              eventOffer.price !== offer.price ||
                              eventOffer.title !== offer.title
                          )
                        }));
                      }
                    }
                  }}
                />
              ))}
          </div>
        </section>
        {updatedEvent.destination && (
          <section className="event__section  event__section--destination">
            <h3 className="event__section-title  event__section-title--destination">
              Destination
            </h3>
            <p className="event__destination-description">
              {updatedEvent.destination.description}
            </p>

            <div className="event__photos-container">
              <div className="event__photos-tape">
                {updatedEvent.destination.pictures.map((picture) => (
                  <img
                    key={picture.src}
                    className="event__photo"
                    src={picture.src}
                    alt={picture.description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </form>
  );
}

EventForm.propTypes = {
  event: shapes.event,
  destinations: PropTypes.arrayOf(shapes.destination),
  offers: PropTypes.arrayOf(shapes.offer),
  setEditing: PropTypes.func,
  updateEvent: PropTypes.func
};

export default EventForm;
