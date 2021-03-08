import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Chart from "chart.js";
import deepmerge from "deepmerge";
import { chartDefaultConfig } from "../chart-options";

const BAR_WIDTH = 44;
const GAP_WIDTH = 6;
const MIN_BAR_LENGTH = 50;

function StatsChart({ title, dataSeries, labels, options }) {
  const config = options
    ? deepmerge(chartDefaultConfig, options)
    : chartDefaultConfig;
  config.options.title.text = title.toUpperCase();

  const canvas = useRef(null);
  const [chart, setChart] = useState(null);

  const data = {
    labels,
    datasets: [
      {
        data: dataSeries,
        barThickness: BAR_WIDTH,
        minBarLength: MIN_BAR_LENGTH,
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#ffffff"
      }
    ]
  };

  useEffect(() => {
    canvas.current.width = 900;
    canvas.current.height = dataSeries.length * (BAR_WIDTH + GAP_WIDTH);
    setChart(new Chart(canvas.current, { ...config, data }));
  }, []);

  const titleClassString = title.split(/\s/).join("-").toLowerCase();
  return (
    <div className={`statistics__item statistics__item--${titleClassString}`}>
      <canvas
        className={`statistics__chart  statistics__chart--${titleClassString}`}
        ref={canvas}
      ></canvas>
    </div>
  );
}

StatsChart.propTypes = {
  title: PropTypes.string,
  dataSeries: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.object
};

export default StatsChart;
