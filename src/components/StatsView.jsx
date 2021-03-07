import React from "react";

import MoneyStats from "./MoneyStats";
import TransportStats from "./TransportStats";

import { capitalize } from "../utils";
import TimeStats from "./TimeStats";

function StatsView({ events, destinations }) {
  return (
    <section className="statistics">
      <h2 className="visually-hidden">Trip statistics</h2>

      <MoneyStats {...{ events }} />
      <TransportStats {...{ events }} />
      <TimeStats {...{ events }} />
    </section>
  );
}

export default StatsView;
