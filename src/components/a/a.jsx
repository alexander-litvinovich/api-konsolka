import React from "react";
import classNames from "classnames";

import { cssUtils } from "utils";

import "./a.css";

const A = ({ href, size, color, onClick, children, text, ...restProps }) => { 
  const classNameResult = classNames("A", cssUtils(restProps), {
    "u-textSmall": size === "s",
    "u-textMedium": size === "m",
    "u-textLarge": size === "l",

    "u-textColorInherit": color === "inherit",
    "A--colorSecondary": color === "secondary",
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
        {!!text ? text : children}
      </button>
    );
  }
};

export default A;
