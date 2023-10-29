import React from 'react';
import './Button.scss';

export function Button(props) {

  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  function getButtonSizeClassName() {
    switch (props.size) {
      case "normal":
        return "button-normal";
      case "small":
        return "button-small";
      case "big":
        return "button-big";
      default:
        return "button-normal";
    }
  }

  function getButtonColorClassName() {
    switch (props.color) {
      case "red":
        return "button-red";
      case "blue":
        return "button-blue";
      default:
        return "button-blue";
    }
  }

  return (
    <button
      className={`button ${props.className || ''} ${getButtonSizeClassName()} ${getButtonColorClassName()}`}
      type={props.type || "button"}
      onClick={handleClick}>
      {props.value}
    </button>
  )
}