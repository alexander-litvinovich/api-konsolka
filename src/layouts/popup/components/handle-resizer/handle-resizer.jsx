import React from "react";
import classNames from "classnames";

import "./handle-resizer.css";

const HandleResizer = () => (
  <div className="HandleResizer">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="3" width="3" height="3" rx="1.5" />
      <rect x="14" y="13" width="3" height="3" rx="1.5" />
      <rect x="9" y="8" width="3" height="3" rx="1.5" />
      <rect x="4" y="8" width="3" height="3" rx="1.5" />
      <rect x="4" y="13" width="3" height="3" rx="1.5" />
      <rect x="9" y="13" width="3" height="3" rx="1.5" />
    </svg>
  </div>
);

export default HandleResizer;
