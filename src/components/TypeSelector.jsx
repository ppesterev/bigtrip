import React, { useState } from "react";
import PropTypes from "prop-types";

import { types, TypeCategories } from "../const";
import { capitalize, getTypeCategory } from "../utils";

function TypeSelector({ type, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const typesByCategory = {
    transport: types.filter(
      (type) => getTypeCategory(type) === TypeCategories.TRANSPORT
    ),
    activity: types.filter(
      (type) => getTypeCategory(type) === TypeCategories.ACTIVITY
    )
  };

  const onTypeSelected = (type) => {
    setIsOpen(false);
    onChange(type);
  };

  const typeOption = (type) => (
    <div className="event__type-item" key={type}>
      <input
        id={`event-type-${type}-1`}
        className="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value={type}
        onChange={() => onTypeSelected(type)}
      />
      <label
        className={`event__type-label  event__type-label--${type}`}
        htmlFor={`event-type-${type}-1`}
      >
        {capitalize(type)}
      </label>
    </div>
  );

  return (
    <div className="event__type-wrapper">
      <label
        className="event__type  event__type-btn"
        htmlFor="event-type-toggle-1"
      >
        <span className="visually-hidden">Choose event type</span>
        <img
          className="event__type-icon"
          width="17"
          height="17"
          src={`img/icons/${type}.png`}
          alt="Event type icon"
        />
      </label>
      <input
        className="event__type-toggle  visually-hidden"
        id="event-type-toggle-1"
        type="checkbox"
        checked={isOpen}
        onChange={(evt) => setIsOpen(evt.target.checked)}
      />

      <div className="event__type-list">
        <fieldset className="event__type-group">
          <legend className="visually-hidden">Transfer</legend>
          {typesByCategory.transport.map(typeOption)}
        </fieldset>

        <fieldset className="event__type-group">
          <legend className="visually-hidden">Activity</legend>
          {typesByCategory.activity.map(typeOption)}
        </fieldset>
      </div>
    </div>
  );
}

TypeSelector.propTypes = {
  type: PropTypes.oneOf([...types]),
  onChange: PropTypes.func
};

export default TypeSelector;
