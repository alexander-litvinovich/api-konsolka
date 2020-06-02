import React from "react";
import classNames from "classnames";


import { cssUtils } from "utils";
import * as icons from "./components";
import "./icon.css";

const Icon = ({ name, autoHeight, ...restProps }) => {
  const ImportedIcon = icons[name];

  return (
    <span
      className={classNames("Icon", cssUtils(restProps), {
        "is-autoHeight": autoHeight,
      })}
      {...restProps}
    >
      <ImportedIcon name={name} />
    </span>
  );
};

export default Icon;
