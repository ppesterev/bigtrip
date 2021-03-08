import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import StatsChart from "./StatsChart";

import { types } from "../const";
import shapes from "../shapes";

const getEventTime = (event) =>
  dayjs(event.dateTo).diff(dayjs(event.dateFrom), "hour");

function TimeStats({ events }) {
  const timeSpentByType = types
    .map((type) => {
      const eventsOfType = events.filter((event) => event.type === type);
      return {
        type,
        time: eventsOfType.reduce((acc, event) => acc + getEventTime(event), 0)
      };
    })
    .filter((type) => type.time !== 0);

  const dataSeries = timeSpentByType.map((type) => type.time);
  const labels = timeSpentByType.map((type) => type.type);

  const options = {
    options: { plugins: { datalabels: { formatter: (val) => `${val}H` } } }
  };

  return (
    <StatsChart {...{ title: "Time spent", dataSeries, labels, options }} />
  );
}

TimeStats.propTypes = {
  events: PropTypes.arrayOf(shapes.event)
};

export default TimeStats;
