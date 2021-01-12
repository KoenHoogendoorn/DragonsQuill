import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  let CardClasses = classes.Card;
  if (props.clickable) {
    CardClasses = `${classes.Card} ${classes.Clickable}`;
  } else {
    CardClasses = classes.Card;
  }

  return (
    <div className={CardClasses} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default Card;
