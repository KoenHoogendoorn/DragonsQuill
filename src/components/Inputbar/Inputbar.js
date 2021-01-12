import React from "react";

import classes from "./Inputbar.module.css";

const Inputbar = (props) => {
  return (
    <input
      className={classes.Inputbar}
      style={props.style}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Inputbar;