import React from "react";
import { connect } from "react-redux";

import classes1 from "../AdventureWrapper.module.css";
import classes2 from "./ContentWrapperLeft.module.css";

import Tab from "../../../components/Tab/Tab";
import Inputbar from "../../../components/Inputbar/Inputbar";
import Button from "../../../components/Button/Button";
import NPC from "../../../components/NPC/NPC";
import Chapter from "../../../components/Chapter/Chapter";

import * as actions from "../../../store/actions/actionsIndex";

const classes = { ...classes1, ...classes2 };

const ContentWrapperLeft = (props) => {
  const activeContentHandler = (activeTab) => {
    const chaptersList = props.chapters.map((chapter) => (
      <Chapter key={chapter.id} test={chapter.id} name={chapter.name} />
    ));

    const npcsList = props.npcs.map((npc) => (
      <NPC
        key={npc.id}
        npcId={npc.id}
        name={npc.name}
        description={npc.description}
      />
    ));

    switch (activeTab) {
      case "Chapters":
        return chaptersList;
      case "NPCs":
        return npcsList;
      default:
        return chaptersList;
    }
  };

  let buttonText = "Add " + props.activeTab.slice(0, -1);

  return (
    <div className={`${classes.ContentWrapper} ${classes.WrapperLeft}`}>
      <h1>Adventure Title</h1>
      <section className={classes.Tabs}>
        <Tab
          contentType={"Chapters"}
          clicked={() => props.activeTabHandler("Chapters")}
        >
          Chapters
        </Tab>
        <Tab
          contentType={"NPCs"}
          clicked={() => props.activeTabHandler("NPCs")}
        >
          NPC's
        </Tab>
        <Tab>Locations</Tab>
        <Tab>Monsters</Tab>
      </section>
      <hr className={classes.TabDivider} />
      <section className={classes.CardToolbar}>
        <Inputbar type="search" placeholder="Search for anything..." />
        <Button>
          <i className="fas fa-plus"></i>
          {buttonText}
        </Button>
      </section>
      <section className={classes.CardsContainer}>
        {activeContentHandler(props.activeTab)}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs,
    chapters: state.contentData.chapters,
    activeTab: state.activeTab.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeTabHandler: (contentType) => dispatch(actions.activeTab(contentType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperLeft);
