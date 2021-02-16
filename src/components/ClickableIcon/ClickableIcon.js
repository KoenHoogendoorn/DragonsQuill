import React from "react";

import classes from "./ClickableIcon.module.scss";

const ClickableIcon = (props) => {
  //change color to active only, or the elipses in chapter react on hovers/actives of dropdown items
  let ClickableIconClasses = props.showDropdown
    ? `${classes.DropdownOut} ${props.class}`
    : `${classes.ClickableIconContainer} ${props.class}`;

  return (
    <div className={ClickableIconClasses} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default ClickableIcon;
