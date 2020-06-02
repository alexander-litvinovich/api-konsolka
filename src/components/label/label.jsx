import React from "react";
import classNames from "classnames";

import { cssUtils } from "utils";

import "./label.css";

const Label = ({ children, size = "m", color = "primary", ...restProps }) => (
  <div
    className={classNames("Label", cssUtils(restProps), {
      "u-textSmall": size === "s",
      "u-textMedium": size === "m",
      "u-textLarge": size === "l",

      "u-textColorInherit": color === "inherit",
      "u-textColorPrimary": color === "primary",
      "u-textColorSecondary": color === "secondary",
    })}
  >
    {children}
  </div>
);

export default Label;
