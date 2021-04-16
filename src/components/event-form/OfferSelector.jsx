import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { nanoid } from "nanoid";

import shapes from "../../shapes";

function OfferSelector({ offer, value, onChange }) {
  const inputId = useMemo(() => nanoid(6));

  return (
    <div className="event__offer-selector">
      <input
        className="event__offer-checkbox  visually-hidden"
        id={`event-offer-${inputId}`}
        type="checkbox"
        name="event-offer-luggage"
        {...{ checked: value, onChange }}
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
  onChange: PropTypes.func
};

export default React.memo(OfferSelector);
