import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppState from "./AppState";

ReactDOM.render(
  <AppState>
    <App />
  </AppState>,
  document.getElementById("root")
);
