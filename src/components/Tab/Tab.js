import React from "react";
import { connect } from "react-redux";
import classes from "./Tab.module.css";

const Tab = (props) => {
  let tabClasses = classes.Tab;

  if (props.contentType === props.activeTab) {
    tabClasses = `${classes.Tab} ${classes.ActiveTab}`;
  } else {
    tabClasses = classes.Tab;
  }

  return (
    <button className={tabClasses} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

const mapStateToProps = (state) => {
  return { activeTab: state.activeTab.activeTab };
};

export default connect(mapStateToProps)(Tab);
