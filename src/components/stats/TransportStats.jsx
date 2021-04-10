import React from "react";
import PropTypes from "prop-types";

import StatsChart from "./StatsChart";

import { TypeCategory, types } from "../../const";
import { getTypeCategory } from "../../utils";
import shapes from "../../shapes";

function TransportStats({ events }) {
  const transportTypesByCount = types
    .filter((type) => getTypeCategory(type) === TypeCategory.TRANSPORT)
    .map((type) => ({
      type,
      count: events.filter((event) => event.type === type).length
    }))
    .filter((type) => type.count > 0);

  // premature (and pointless) optimization
  // const transportTypesByCount = events.reduce((typeMap, event) => {
  //   if (getTypeCategory(event.type) !== TypeCategory.TRANSPORT) {
  //     return typeMap;
  //   }
  //   return {...typeMap, ...{[event.type]: typeMap[event.type] + 1 || 1}};
  // })

  const dataSeries = transportTypesByCount.map((type) => type.count);
  const labels = transportTypesByCount.map((type) => type.type);

  const options = {
    options: { plugins: { datalabels: { formatter: (val) => `${val}x` } } }
  };

  return (
    <StatsChart
      {...{ title: "Transport types", dataSeries, labels, options }}
    />
  );
}

TransportStats.propTypes = {
  events: PropTypes.arrayOf(shapes.event)
};

export default TransportStats;
