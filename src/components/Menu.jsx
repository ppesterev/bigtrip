import React from "react";
import { Views } from "../const";

export default function Menu({ activeView, setView }) {
  const link = (text, view) => (
    <a
      className={`trip-tabs__btn  ${
        activeView === view ? "trip-tabs__btn--active" : ""
      }`}
      href="#"
      onClick={() => setView(view)}
    >
      {text}
    </a>
  );

  return (
    <nav className="trip-controls__trip-tabs  trip-tabs">
      {link("Table", Views.HOME)}
      {link("Stats", Views.STATS)}
    </nav>
  );
}
