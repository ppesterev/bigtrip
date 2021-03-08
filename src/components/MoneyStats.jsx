import React from "react";
import PropTypes from "prop-types";

import StatsChart from "./StatsChart";

import { types } from "../const";
import shapes from "../shapes";

function MoneyStats({ events }) {
  const expensesByType = types
    .map((type) => {
      const eventsOfType = events.filter((event) => event.type === type);
      return {
        type,
        expense: eventsOfType.reduce((acc, event) => acc + event.basePrice, 0)
      };
    })
    .filter((type) => type.expense !== 0);

  const dataSeries = expensesByType.map((type) => type.expense);
  const labels = expensesByType.map((type) => type.type);

  const options = {
    options: { plugins: { datalabels: { formatter: (val) => `€ ${val}` } } }
  };

  return <StatsChart {...{ title: "Expenses", dataSeries, labels, options }} />;
}

MoneyStats.propTypes = {
  events: PropTypes.arrayOf(shapes.event)
};

export default MoneyStats;
