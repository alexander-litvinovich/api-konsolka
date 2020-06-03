import React from "react";
import ReactDOM from "react-dom";
import PopupContainer from "./containers/popup-container";

import "./global.css";

ReactDOM.render(
  <PopupContainer popupMode={true} />,
  document.getElementById("root")
);
