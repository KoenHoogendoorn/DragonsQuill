import React from "react";
import { connect } from "react-redux";

import classes from "./CardBackground.module.scss";

const CardBackground = (props) => {
  let cardClasses = `${classes.Card} `;

  if (props.id === props.activeChapterId) {
    cardClasses += `${classes.ActiveCard} `;
  }

  if (props.activeTab === "Chapters") {
    cardClasses += `${classes.Chapter} `;
  }

  return (
    <div onClick={props.clicked} className={cardClasses}>
      {props.children}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeChapterId: state.activeChapterId.activeChapterId,
    activeTab: state.activeTab.activeTab
  };
};

export default connect(mapStateToProps)(CardBackground);
