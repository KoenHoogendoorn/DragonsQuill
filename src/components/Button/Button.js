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
      ButtonClasses = `${classes.Button} `;
      break;
  }

  switch (props.priority) {
    case "primary":
      ButtonClasses += `${classes.Primary}`;
      break;
    case "secondary":
      ButtonClasses += `${classes.Secondary}`;
      break;
    case "tertiary":
      ButtonClasses += `${classes.Tertiary}`;
      break;
    default:
      ButtonClasses = `${classes.Button} `;
      break;
  }

  return (
    <button type="button" className={ButtonClasses} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
