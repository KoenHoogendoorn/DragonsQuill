import React, { useState } from "react";

import classes from "./AdventureWrapper.module.scss";

import ContentWrapperLeft from "./ContentWrapperLeft/ContentWrapperLeft";
import ContentWrapperRight from "./ContentWrapperRight/ContentWrapperRight";
import MobileHeaderBar from "../../components/MobileHeaderBar/MobileHeaderBar";
import Button from "../../components/Button/Button";

const AdventureWrapper = () => {
  const [activeContentWrapper, setActiveContentWrapper] = useState("left");
  let addedClassesLeft = "";
  let addedClassesRight = "";

  if (activeContentWrapper === "left") {
    addedClassesLeft = `${classes.MoveBack}`;
    addedClassesRight = `${classes.MoveRight}`;
  }

  if (activeContentWrapper === "right") {
    addedClassesLeft = `${classes.MoveLeft}`;
    addedClassesRight = `${classes.MoveBack}`;
  }

  const mobileHeaderBarLeft = (
    <MobileHeaderBar>
      <div></div>
      <Button
        priority="tertiary"
        iconPlacement="right"
        clicked={() => setActiveContentWrapper("right")}
      >
        Editor<i className="fas fa-arrow-right"></i>
      </Button>
    </MobileHeaderBar>
  );

  const mobileHeaderBarRight = (
    <MobileHeaderBar activeContentWrapper={activeContentWrapper}>
      <Button
        priority="tertiary"
        iconPlacement="left"
        clicked={() => setActiveContentWrapper("left")}
      >
        <i className="fas fa-arrow-left"></i>Adventure
      </Button>
      <div></div>
    </MobileHeaderBar>
  );

  return (
    <React.Fragment>
      {activeContentWrapper === "left"
        ? mobileHeaderBarLeft
        : mobileHeaderBarRight}
      <div className={classes.AdventureWrapper}>
        <ContentWrapperLeft addedClassesLeft={addedClassesLeft} />
        <ContentWrapperRight
          addedClassesRight={addedClassesRight}
          setActiveContentWrapperLeft={() => setActiveContentWrapper("left")}
        />
      </div>
    </React.Fragment>
  );
};

export default AdventureWrapper;
