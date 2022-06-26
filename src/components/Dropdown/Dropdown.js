import React, { useState } from "react";
import classes from "./Dropdown.module.scss";

const Dropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  let dropdownContentClasses = showDropdown
    ? `${classes.DropdownContent} ${classes.Show}`
    : `${classes.DropdownContent}`;

  return (
    <div
      className={classes.Dropdown}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <i className={props.clickableIconName}></i>
      <div className={dropdownContentClasses}>{props.children}</div>
    </div>
  );
};

export default Dropdown;
