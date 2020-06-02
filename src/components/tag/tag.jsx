import React from "react";
import classNames from "classnames";

import { cssUtils } from "utils";

import "./tag.css";

const Tag = ({ children, ...restProps }) => (
  <span className={cssUtils(restProps, "Tag")} {...restProps}>
    {children}
  </span>
);

export default Tag;
