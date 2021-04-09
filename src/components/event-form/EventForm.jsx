import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import OfferSelector from "./OfferSelector";
import TypeSelector from "./TypeSelector";

import { capitalize, getTypeCategory } from "../../utils";
import { TypeCategories } from "../../const";
import TripEvent from "../../models/TripEvent";
import shapes from "../../shapes";
import {
  addEvent,
  deleteEvent,
  updateEvent,
  stopEditing
} from "../../store/operations";

const FormStatus = {
  IDLE: "IDLE",
  SAVING: "SAVING",
  DELETING: "DELETING",
  FAVORITING: "FAVORITING"
};

function EventForm({ event, destinations, offers, dispatch }) {
  const doneEditing = () => dispatch(stopEditing());

  const [editedEvent, setEditedEvent] = useState(
    event || TripEvent.getBlankEvent()
  );

  const destinationInput = useRef(null);
  const updateDestination = () => {
    const newDestination =
      destinations.find((dest) =>
        dest.name
          .toLowerCase()
          .startsWith(destinationInput.current.value.toLowerCase())
      ) || editedEvent.destination;

    setEditedEvent({ ...editedEvent, destination: newDestination });
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
  }, []);

  const [status, setStatus] = useState(FormStatus.IDLE);
  const applyChanges = (action, newStatus) => {
    if (status !== FormStatus.IDLE) {
      return;
    }

    setStatus(newStatus);
    dispatch(action).then(() => {
      setStatus(FormStatus.IDLE);
      if (newStatus !== FormStatus.FAVORITING) {
        doneEditing();
      }
    });
  };

  const onSave = () => {
    const submittedEvent = {
      ...editedEvent,
      isFavorite: event?.isFavorite || false
    };
    const action = event
      ? updateEvent(event.id, submittedEvent)
      : addEvent(submittedEvent);

    applyChanges(action, FormStatus.SAVING);
  };

  const onDelete = () => {
    const action = deleteEvent(event.id);
    applyChanges(action, FormStatus.DELETING);
  };

  const onFavorite = () => {
    const action = updateEvent(event.id, {
      ...event,
      isFavorite: !event.isFavorite
    });
    applyChanges(action, FormStatus.FAVORITING);
  };

  return (
    <form
      style={{
        filter: status === FormStatus.IDLE ? "none" : "brightness(95%)",
        transition: "0.1s"
      }}
      className="trip-events__item  event  event--edit"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        if (!editedEvent.dateFrom || !editedEvent.dateTo) {
          return;
        } // more validation later
        onSave();
      }}
      onReset={(evt) => {
        evt.preventDefault();
        event ? onDelete() : doneEditing();
      }}
    >
      <header className="event__header">
        <TypeSelector
          type={editedEvent.type}
          onChange={(value) =>
            setEditedEvent({ ...editedEvent, type: value, offers: [] })
          }
        />

        <div className="event__field-group  event__field-group--destination">
          <label
            className="event__label  event__type-output"
            htmlFor="event-destination-1"
          >
            {capitalize(editedEvent.type)}{" "}
            {getTypeCategory(editedEvent.type) === TypeCategories.ACTIVITY
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
            value={editedEvent.dateFrom}
            onChange={(dates) =>
              setEditedEvent({ ...editedEvent, dateFrom: dates[0] })
            }
            options={{
              dateFormat: "d/m/y H:i",
              maxDate: editedEvent.dateTo
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
            value={editedEvent.dateTo}
            onChange={(dates) =>
              setEditedEvent({ ...editedEvent, dateTo: dates[0] })
            }
            options={{
              dateFormat: "d/m/y H:i",
              minDate: editedEvent.dateFrom
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
            value={editedEvent.basePrice}
            onChange={(evt) => {
              const newPrice = parseInt(evt.target.value) || 0;
              if (newPrice || newPrice === 0) {
                setEditedEvent({ ...editedEvent, basePrice: newPrice });
              }
            }}
          />
        </div>

        <button className="event__save-btn  btn  btn--blue" type="submit">
          {status === FormStatus.SAVING ? "Saving..." : "Save"}
        </button>
        <button className="event__reset-btn" type="reset">
          {event
            ? status === FormStatus.DELETING
              ? "Deleting..."
              : "Delete"
            : "Cancel"}
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
              onChange={onFavorite}
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
            {offers[editedEvent.type].map((offer) => (
              <OfferSelector
                key={`${offer.title} - ${offer.price}`}
                offer={offer}
                value={editedEvent.offers.some(
                  // the event's selected offers include one just like this!
                  (eventOffer) =>
                    eventOffer.title === offer.title &&
                    eventOffer.price === offer.price
                )}
                onChange={(evt) => {
                  if (evt.target.checked) {
                    setEditedEvent((editedEvent) => ({
                      ...editedEvent,
                      offers: editedEvent.offers.concat(offer)
                      // is this a problem? could we have a situation when this offer is already in?
                    }));
                  } else {
                    setEditedEvent((editedEvent) => ({
                      ...editedEvent,
                      offers: editedEvent.offers.filter(
                        (eventOffer) =>
                          eventOffer.price !== offer.price ||
                          eventOffer.title !== offer.title
                      )
                    }));
                  }
                }}
              />
            ))}
          </div>
        </section>
        {editedEvent.destination && (
          <section className="event__section  event__section--destination">
            <h3 className="event__section-title  event__section-title--destination">
              Destination
            </h3>
            <p className="event__destination-description">
              {editedEvent.destination.description}
            </p>

            <div className="event__photos-container">
              <div className="event__photos-tape">
                {editedEvent.destination.pictures.map((picture) => (
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
  offers: PropTypes.object,
  setEditing: PropTypes.func,
  dispatch: PropTypes.func
};

export default EventForm;
