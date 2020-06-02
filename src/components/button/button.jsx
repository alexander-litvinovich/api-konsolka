import React from "react";
import classNames from "classnames";

import ButtonPreloader from "./components/button-preloader";
import "./button.css";
import {cssUtils} from "utils";

const Button = ({
  href,
  size = "m",
  color,
  onClick,
  children,
  text,
  intent = "default",
  loading = false,
  timer = 0,
  ...restProps
}) => {
  const classNameResult = classNames("Button", cssUtils(restProps), {
    "u-textSmall": size === "s",
    "u-textMedium": size === "m",
    "u-textLarge": size === "l",

    "Button--intentDefault": (intent === "default"),
    "Button--intentPrimary": (intent === "primary"),
    "Button--timer": timer > 0,

    isLoading: loading,
  });

  if (!!href) {
    return (
      <a
        className={classNameResult}
        href={href}
        onClick={onClick}
        {...restProps}
      >
        {!!text ? text : children}
      </a>
    );
  } else {
    return (
      <button
        className={classNameResult}
        href={href}
        onClick={onClick}
        {...restProps}
      >
        {timer > 0 && (
          <div
            className="Button-progress"
            style={{
              "--timer-value": `${timer}s`,
            }}
          ></div>
        )}
        <div className="Button-shape">{!!text ? text : children}</div>
        <div className="Button-preloader">
          <ButtonPreloader />
        </div>
      </button>
    );
  }
};

export default Button;
