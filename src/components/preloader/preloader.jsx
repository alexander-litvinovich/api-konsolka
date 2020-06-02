import React from "react";
import classNames from "classnames";

import "./preloader.css";

const Preloader = ({ loading }) => (
  <div
    className={classNames("Preloader", {
      isLoading: loading,
    })}
  >
    <div className="Preloader-pod">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="Preloader-animated"
          d="M3.84937 12.7887L25 0.57735L46.1506 12.7887V37.2113L25 49.4226L3.84937 37.2113V12.7887Z"
        />
        <circle cx="25" cy="25" r="9.5" />
      </svg>
    </div>
  </div>
);

export default Preloader;
