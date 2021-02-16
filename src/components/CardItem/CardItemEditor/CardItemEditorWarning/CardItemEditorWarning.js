import React from "react";
import { connect } from "react-redux";

import classes from "./CardItemEditorWarning.module.scss";

const CardItemEditorWarning = (props) => {
  let warningClasses = `${classes.CardItemEditorWarningContainer} `;
  if (props.fadeout) {
    warningClasses += `${classes.Deleted}`;
  }

  return (
    <div className={warningClasses}>
      <i className="fas fa-fire-alt"></i>
      Please add a name for this {props.activeTab.slice(0, -1).toLowerCase()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTab: state.activeTab.activeTab
  };
};

export default connect(mapStateToProps)(CardItemEditorWarning);
