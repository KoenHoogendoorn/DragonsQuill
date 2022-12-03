import React from "react";
import classes from "./SecondaryLink.module.scss";

const SecondaryLink = (props) => (
  <a className={classes.SecondaryLink} href={props.url}>
    {props.children}
  </a>
);

export default SecondaryLink;
