import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { nanoid } from "nanoid";

import shapes from "../../shapes";

function OfferSelector({ offer, value, onAdded, onRemoved }) {
  const inputId = useMemo(() => nanoid(6));

  return (
    <div className="event__offer-selector">
      <input
        className="event__offer-checkbox  visually-hidden"
        id={`event-offer-${inputId}`}
        type="checkbox"
        name="event-offer-luggage"
        checked={value}
        onChange={(evt) =>
          evt.target.checked ? onAdded(offer) : onRemoved(offer)
        }
      />
      <label className="event__offer-label" htmlFor={`event-offer-${inputId}`}>
        <span className="event__offer-title">{offer.title}</span>
        {"+"} &euro;&nbsp;
        <span className="event__offer-price">{offer.price}</span>
      </label>
    </div>
  );
}

OfferSelector.propTypes = {
  offer: shapes.offer,
  value: PropTypes.bool,
  onAdded: PropTypes.func,
  onRemoved: PropTypes.func
};

export default React.memo(OfferSelector);
