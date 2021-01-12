import React from "react";

import { connect } from "react-redux";

import classes from "./Chevron.module.css";

const NPC = (props) => {
  const chevronIcon = props.cardOpen ? (
    <i className={`fas fa-chevron-down ${classes.cardOpenIcon}`}></i>
  ) : (
    <i className={`fas fa-chevron-down ${classes.cardClosedIcon}`}></i>
  );

  return chevronIcon;
};

const mapStateToProps = (state) => {
  return {
    cardOpen: state.card.cardOpen
  };
};

export default connect(mapStateToProps)(NPC);
