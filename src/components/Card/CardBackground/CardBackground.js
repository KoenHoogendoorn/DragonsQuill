import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actionsIndex";

import classes from "./CardBackground.module.scss";

const CardBackground = (props) => {
  let cardClasses = `${classes.Card} `;

  if (props.id === props.activeChapter) {
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
    activeChapter: state.activeChapter.activeChapter,
    activeTab: state.activeTab.activeTab,
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

export default connect(mapStateToProps, mapDispatchToProps)(CardBackground);
