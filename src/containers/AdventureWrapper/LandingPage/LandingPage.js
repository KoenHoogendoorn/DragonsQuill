import React from "react";
import classes from "./LandingPage.module.scss";

import Logo from "../../../assets/logo/DragonsQuillLogo";

import Button from "../../../components/Button/Button";

const LandingPage = (props) => (
  <div className={classes.LandingPage}>
    <Logo classes={classes.Logo} />
    <div className={classes.LandingPageText}>
      <h2>
        Dragon's Quill is an editor to help write and run D&#38;D adventures in
        a more structured way
      </h2>
      <p>
        This is very much a work in progress. There is no online backup of any
        content you write. You can save your content by downloading your
        adventure file. Upload it next time you want to continue working on your
        adventures.
      </p>
    </div>
    <div className={classes.ButtonWrapper}>
      <Button
        priority="primary"
        size="big"
        // clicked={() => setActiveContentWrapper("left")}
      >
        Show demo
      </Button>
      <Button
        priority="primary"
        size="big"
        // clicked={() => setActiveContentWrapper("left")}
      >
        New adventure
      </Button>
    </div>
    <div className={classes.InputBox}>
      <div className={classes.InputBoxText}>
        <h4>Drop an existing adventure file here</h4>
        <i className={classes.HelpText}>.JSON files only</i>
      </div>
      <Button
        priority="secondary"
        size="big"
        // clicked={() => setActiveContentWrapper("left")}
      >
        or click here
      </Button>
    </div>
  </div>
);

export default LandingPage;
