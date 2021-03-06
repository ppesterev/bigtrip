import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import { generateData } from "./mock-data";

const data = generateData(8);

ReactDOM.render(<App data={data} />, document.getElementById("app"));
