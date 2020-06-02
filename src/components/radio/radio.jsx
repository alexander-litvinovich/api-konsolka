import React, { Component } from "react"
import classNames from "classnames"

import { cssUtils } from "utils";

import "./radio.css"

class Radio extends Component {
  constructor(props) {
    super(props)

    const { value, list } = props

    const indexValue = list.reduce((foundIndex, currentValue, currentIndex) => {
      return currentValue.value === value ? currentIndex : foundIndex
    }, -1)

    this.state = {
      selected: indexValue >= 0 ? indexValue : 0,
    }
  }

  onSetIndex = (index) => (e) => {
    const { onChange = () => {}, list } = this.props
    this.setState({ selected: index }, () => {
      onChange({ value: list[index].value, event: e })
    })
  }

  render() {
    const {
      list,
      tabs = true,
      panelLeft = null,
      panelRight = null,
    } = this.props
    const { selected } = this.state

    return (
      <div className={classNames("Radio", cssUtils(this.props), { "Radio--tabs": tabs })}>
        <div className="Radio-panelLeft">{panelLeft}</div>
        <div className="Radio-buttonList">
          {list.map(({ text }, index) => (
            <RadioButton
              key={index}
              selected={index === selected}
              text={text}
              onClick={this.onSetIndex(index)}
            />
          ))}
        </div>
        <div className="Radio-panelRight">{panelRight}</div>
      </div>
    )
  }
}

// const Radio = ({ list, ...restProps }) => (
//   <div className="Radio" {...restProps}>
//     <label>
//       <input
//         name="loginType"
//         type="radio"
//         checked={loginWithPass}
//         onClick={changeLoginType(true)}
//       />{" "}
//       Логин-пароль
//     </label>
//     <label>
//       <input
//         name="loginType"
//         type="radio"
//         checked={!loginWithPass}
//         onClick={changeLoginType(false)}
//       />{" "}
//       API-ключ
//     </label>
//   </div>
// );

const RadioButton = ({
  text,
  index,
  disabled = false,
  selected = false,
  onSetIndex,
  ...restProps
}) => (
  <button
    className={classNames("Radio-Button", {
      isSelected: selected,
      isDisabled: disabled,
    })}
    disabled={disabled}
    {...restProps}
  >
    {text}
  </button>
)

export default Radio
