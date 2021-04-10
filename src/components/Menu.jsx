import React from "react";
import PropTypes from "prop-types";

import { View } from "../const";
import { setView } from "../store/actions";

function Menu({ activeView, dispatch }) {
  const Link = (text, view) => (
    <a
      className={`trip-tabs__btn  ${
        activeView === view ? "trip-tabs__btn--active" : ""
      }`}
      href="#"
      onClick={() => dispatch(setView(view))}
    >
      {text}
    </a>
  );

  return (
    <nav className="trip-controls__trip-tabs  trip-tabs">
      {Link("Table", View.HOME)}
      {Link("Stats", View.STATS)}
    </nav>
  );
}

Menu.propTypes = {
  activeView: PropTypes.oneOf(Object.values(View)),
  dispatch: PropTypes.func
};

export default React.memo(Menu);
