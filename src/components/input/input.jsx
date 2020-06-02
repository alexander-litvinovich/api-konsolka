import React from "react";
import classNames from "classnames";

import { cssUtils } from "utils";

import "./input.css";

const Input = ({
  password,
  text,
  label = null,
  panelLeft = null,
  panelRight = null,
  isValid = null,
  validationMessage = null,
  ...restProps
}) => (
  <div
    className={classNames("Input", cssUtils(restProps), {
      isInput: !text,
      isTextarea: text,
      isValidationMessage: validationMessage && !isValid,
    })}
  >
    {label && <div className="Input-label">{label}</div>}
    <div className="Input-shape">
      {text ? (
        <>
          <textarea {...restProps} />
        </>
      ) : (
        <>
          <div className="Input-panelLeft">{panelLeft}</div>
          <input type={password ? "password" : "text"} {...restProps} />
          <div className="Input-panelRight">{panelRight}</div>
        </>
      )}
    </div>
    {validationMessage && !isValid && (
      <div className="Input-validationMessage u-textSmall">
        {validationMessage}
      </div>
    )}
  </div>
);

export default Input;
