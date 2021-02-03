import React from "react";

import classes from "./AdventureWrapper.module.scss";
import ContentWrapperLeft from "./ContentWrapperLeft/ContentWrapperLeft";
import ContentWrapperRight from "./ContentWrapperRight/ContentWrapperRight";

const AdventureWrapper = () => {
  return (
    <div className={classes.AdventureWrapper}>
      <ContentWrapperLeft />
      <ContentWrapperRight />
    </div>
  );
};

export default AdventureWrapper;
