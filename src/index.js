import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

window.addEventListener("load", () => {
  navigator.serviceWorker.register("./service-worker.js");
});

ReactDOM.render(<App />, document.getElementById("app"));
