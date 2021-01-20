import React from "react";
import { connect } from "react-redux";

import classes from "./Card.module.css";

const Card = (props) => {
  let cardClasses = classes.Card;

  if (props.id === props.activeChapter) {
    cardClasses = `${classes.Card} ${classes.ActiveCard}`;
  } else {
    cardClasses = classes.Card;
  }
  return (
    <div className={cardClasses} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activeChapter: state.activeChapter.activeChapter };
};

export default connect(mapStateToProps)(Card);
