import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "./Card.module.css";

const Card = (props) => {
  let cardClasses = classes.Card;

  if (props.id === props.activeChapter) {
    cardClasses = `${classes.Card} ${classes.ActiveCard}`;
  } else {
    cardClasses = classes.Card;
  }

  return <div className={cardClasses}>{props.children}</div>;
};

const mapStateToProps = (state) => {
  return {
    activeChapter: state.activeChapter.activeChapter,
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id)),
    sortContentHandler: () => dispatch(actions.sortContent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
