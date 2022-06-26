import React, { useState, useEffect, useRef } from "react";
import classes from "./Dropdown.module.scss";

const Dropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // hide panel if clicked outside of it.
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropdown(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [ref]);
  }

  let dropdownContent = showDropdown ? (
    <div className={classes.DropdownContent} ref={wrapperRef}>
      {props.children}
    </div>
  ) : null;

  return (
    <div className={classes.Dropdown}>
      <i
        className={props.clickableIconName}
        onClick={() => setShowDropdown(!showDropdown)}
      ></i>
      {dropdownContent}
    </div>
  );
};

export default Dropdown;
