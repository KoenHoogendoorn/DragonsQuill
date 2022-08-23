import React, { useState, useEffect } from "react";

import classes from "./AdventureWrapper.module.scss";

import LandingPage from "./LandingPage/LandingPage";
import ContentWrapperLeft from "./ContentWrapperLeft/ContentWrapperLeft";
import ContentWrapperRight from "./ContentWrapperRight/ContentWrapperRight";
import MobileHeaderBar from "../../components/MobileHeaderBar/MobileHeaderBar";
import Button from "../../components/Button/Button";
import Logo from "../../assets/logo/DragonsQuillLogo";

const AdventureWrapper = () => {
  const [activePage, setActivePage] = useState("landingPage");
  const [activeContentWrapper, setActiveContentWrapper] = useState("left");
  const [showDemoContent, setShowDemoContent] = useState(false);

  useEffect(() => {}, []);

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
      <Logo classes={classes.Logo} />
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

  const landingPage = (
    <LandingPage
      setActivePage={() => setActivePage("")}
      setShowDemoContent={(boolean) => setShowDemoContent(boolean)}
    />
  );

  const editorPage = (
    <React.Fragment>
      {activeContentWrapper === "left"
        ? mobileHeaderBarLeft
        : mobileHeaderBarRight}
      <div className={classes.AdventureWrapper}>
        <ContentWrapperLeft
          addedClassesLeft={addedClassesLeft}
          setActivePage={() => setActivePage("landingPage")}
        />
        <ContentWrapperRight
          addedClassesRight={addedClassesRight}
          setActiveContentWrapperLeft={() => setActiveContentWrapper("left")}
          showDemoContent={showDemoContent}
        />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {activePage === "landingPage" ? landingPage : editorPage}
    </React.Fragment>
  );
};

export default AdventureWrapper;
