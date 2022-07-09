import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./LandingPage.module.scss";

import AdventureNameEditModal from "../../../components/AdventureNameEditModal/AdventureNameEditModal";
import Button from "../../../components/Button/Button";
import Logo from "../../../assets/logo/DragonsQuillLogo";

import * as actions from "../../../store/actions/actionsIndex";

const LandingPage = (props) => {
  const [openAdventureNameModal, setOpenAdventureNameModal] = useState(false);

  const handleNewAdventure = () => {
    // overwrite content with empty state
    const emptyContentData = [
      [
        {
          id: "ad0",
          value: ""
        }
      ],
      [
        {
          id: "ch0",
          value: "Chapters"
        }
      ],
      [
        {
          id: "np0",
          value: "NPC's",
          disabled: true
        }
      ],
      [
        {
          id: "mo0",
          value: "Monsters",
          disabled: true
        }
      ],
      [
        {
          id: "lo0",
          value: "Locations",
          disabled: true
        }
      ]
    ];
    props.overwriteContentHandler(emptyContentData);
    // change activePage in adventurewrapper to newAdventureNamePage
    setOpenAdventureNameModal(true);
  };

  return (
    <div className={classes.LandingPage}>
      <AdventureNameEditModal
        modalTitle={"What is your adventure name?"}
        openAdventureNameModal={openAdventureNameModal}
        setOpenAdventureNameModal={() => setOpenAdventureNameModal(false)}
        addToSaveHandler={() => props.setActivePage()}
      />
      <Logo classes={classes.Logo} />
      <div className={classes.LandingPageText}>
        <h2>
          Dragon's Quill is an editor to help write and run D&#38;D adventures
          in a more structured way
        </h2>
        <p>
          This is very much a work in progress. There is no online backup of any
          content you write. You can save your content by downloading your
          adventure file. Upload it next time you want to continue working on
          your adventures.
        </p>
      </div>
      <div className={classes.ButtonWrapper}>
        <Button
          priority="primary"
          size="big"
          clicked={() => handleNewAdventure()}
        >
          New adventure
        </Button>
        <Button
          priority="secondary"
          size="big"
          clicked={() => props.setActivePage()}
        >
          Show demo
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    overwriteContentHandler: (newData) =>
      dispatch(actions.overwriteContent(newData))
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
