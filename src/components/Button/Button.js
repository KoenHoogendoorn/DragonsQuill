import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  let ButtonClasses = classes.Button;

  switch (props.size) {
    case "big":
      ButtonClasses = `${classes.Button} ${classes.Big}`;
      break;
    case "medium":
      ButtonClasses = `${classes.Button} ${classes.Medium}`;
      break;
    case "small":
      ButtonClasses = `${classes.Button} ${classes.Small}`;
      break;
    default:
      ButtonClasses = classes.Button;
      break;
  }

  return (
    <button type="button" className={ButtonClasses}>
      {props.children}
    </button>
  );
};

export default Button;
