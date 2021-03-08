import React from "react";
import PropTypes from "prop-types";

import MoneyStats from "./MoneyStats";
import TransportStats from "./TransportStats";
import TimeStats from "./TimeStats";

import shapes from "../../shapes";

function StatsView({ events }) {
  return (
    <section className="statistics">
      <h2 className="visually-hidden">Trip statistics</h2>

      <MoneyStats {...{ events }} />
      <TransportStats {...{ events }} />
      <TimeStats {...{ events }} />
    </section>
  );
}

StatsView.propTypes = {
  events: PropTypes.arrayOf(shapes.event)
};

export default StatsView;
