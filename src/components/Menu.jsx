import React from "react";
import { Views } from "../const";

export default function Menu({ activeView, onViewSelected }) {
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
