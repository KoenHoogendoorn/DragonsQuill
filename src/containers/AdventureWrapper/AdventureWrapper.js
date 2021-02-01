import React from "react";

import classes from "./AdventureWrapper.module.css";
import ContentWrapperLeft from "./ContentWrapperLeft/ContentWrapperLeft";
import ContentWrapperRight from "./ContentWrapperRight/ContentWrapperRight";

const AdventureWrapper = (props) => {
  return (
    <div className={classes.AdventureWrapper}>
      <ContentWrapperLeft />
      <ContentWrapperRight />
    </div>
  );
};

export default AdventureWrapper;
