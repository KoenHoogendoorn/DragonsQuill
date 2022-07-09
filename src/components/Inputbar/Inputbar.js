import React from "react";

import classes from "./Inputbar.module.scss";

const Inputbar = (props) => {
  return (
    <input
      id={props.id}
      className={classes.Inputbar}
      style={props.style}
      type={props.type}
      placeholder={props.placeholder}
      value={props.val}
      onChange={props.changed}
    />
  );
};

export default Inputbar;
