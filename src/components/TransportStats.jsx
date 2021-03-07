import React from "react";

import StatsChart from "./StatsChart";

import { TypeCategories, types } from "../const";
import { getTypeCategory } from "../utils";

function TransportStats({ events }) {
  const transportTypesByCount = types
    .filter((type) => getTypeCategory(type) === TypeCategories.TRANSPORT)
    .map((type) => ({
      type,
      count: events.filter((event) => event.type === type).length
    }))
    .filter((type) => type.count > 0);

  // premature (and pointless) optimization
  // const transportTypesByCount = events.reduce((typeMap, event) => {
  //   if (getTypeCategory(event.type) !== TypeCategories.TRANSPORT) {
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

export default TransportStats;
