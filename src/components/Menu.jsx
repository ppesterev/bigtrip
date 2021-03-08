import React from "react";
import PropTypes from "prop-types";

import { Views } from "../const";

function Menu({ activeView, onViewSelected }) {
  const Link = (text, view) => (
    <a
      className={`trip-tabs__btn  ${
        activeView === view ? "trip-tabs__btn--active" : ""
      }`}
      href="#"
      onClick={() => onViewSelected(view)}
    >
      {text}
    </a>
  );

  return (
    <nav className="trip-controls__trip-tabs  trip-tabs">
      {Link("Table", Views.HOME)}
      {Link("Stats", Views.STATS)}
    </nav>
  );
}

Menu.propTypes = {
  activeView: PropTypes.oneOf(Object.values(Views)),
  onViewSelected: PropTypes.func
};

export default Menu;
