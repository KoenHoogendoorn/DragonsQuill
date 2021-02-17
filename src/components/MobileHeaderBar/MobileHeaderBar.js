import React from "react";
import classes from "./MobileHeaderBar.module.scss";

const MobileHeaderBar = (props) => (
  <div className={classes.MobileHeaderBar}>{props.children}</div>
);

export default MobileHeaderBar;
