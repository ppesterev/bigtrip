import React from "react";
import PropTypes from "prop-types";

import StatsChart from "./StatsChart";

import { TypeCategory, types } from "../../const";
import { capitalize, getTypeCategory } from "../../utils";
import shapes from "../../shapes";

function TransportStats({ events }) {
  const transportTypesByCount = types
    .filter((type) => getTypeCategory(type) === TypeCategory.TRANSPORT)
    .map((type) => ({
      type,
      count: events.filter((event) => event.type === type).length
    }))
    .filter((type) => type.count > 0);

  const dataSeries = transportTypesByCount.map((type) => type.count);
  const labels = transportTypesByCount.map((type) => capitalize(type.type));

  const options = {
    options: { plugins: { datalabels: { formatter: (val) => `${val}x` } } }
  };

  return (
    <StatsChart
      title="Transport types"
      dataSeries={dataSeries}
      labels={labels}
      options={options}
    />
  );
}

TransportStats.propTypes = {
  events: PropTypes.arrayOf(shapes.event)
};

export default TransportStats;
