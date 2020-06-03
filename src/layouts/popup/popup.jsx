import React from "react";
import { Resizable } from "re-resizable";

import HandleResizer from "./components/handle-resizer";

import "./popup.css";

const Popup = ({
  children,
  popupWidth,
  popupHeight,
  onResizeStop = () => {},
  popupRef = null,
  ...restProps
}) => (
  <Resizable
    className="Popup"
    size={{
      width: popupWidth,
      height: popupHeight,
    }}
    minWidth="450"
    maxWidth="800"
    minHeight="350"
    enable={{
      bottomLeft: true,
    }}
    handleComponent={{
      bottomLeft: <HandleResizer />,
    }}
    handleStyles={{
      bottomLeft: {
        left: 0,
        bottom: 0,
        width: "30px",
        height: "30px",
      },
    }}
    onResizeStop={onResizeStop}
    ref={popupRef}
    {...restProps}
  >
    {children}
  </Resizable>
);

export default Popup;
