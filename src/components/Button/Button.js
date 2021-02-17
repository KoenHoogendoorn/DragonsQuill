import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  let ButtonClasses = `${classes.Button} `;

  switch (props.size) {
    case "big":
      ButtonClasses += `${classes.Big} `;
      break;
    case "medium":
      ButtonClasses += `${classes.Medium} `;
      break;
    case "small":
      ButtonClasses += `${classes.Small} `;
      break;
    default:
      break;
  }

  switch (props.priority) {
    case "primary":
      ButtonClasses += `${classes.Primary} `;
      break;
    case "secondary":
      ButtonClasses += `${classes.Secondary} `;
      break;
    case "tertiary":
      ButtonClasses += `${classes.Tertiary} `;
      break;
    default:
      break;
  }

  switch (props.iconPlacement) {
    case "right":
      ButtonClasses += `${classes.IconRight} `;
      break;
    case "left":
      ButtonClasses += `${classes.IconLeft} `;
      break;
    default:
      break;
  }

  //sample button component: <Button size="small" priority="tertiary" iconPlacement="right">button</Button>

  return (
    <button type="button" className={ButtonClasses} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
