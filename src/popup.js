import React from "react";
import ReactDOM from "react-dom";
import { ConsoleContextProvider } from "containers/console-context";
import PopupContainer from "./containers/popup-container";

import "./global.css";

ReactDOM.render(
  <ConsoleContextProvider popupMode={true}>
    <PopupContainer />
  </ConsoleContextProvider>,
  document.getElementById("root")
);
