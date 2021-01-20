import React from "react";
import { connect } from "react-redux";

import classes1 from "../AdventureWrapper.module.css";
import classes2 from "./ContentWrapperLeft.module.css";

import Tab from "../../../components/Tab/Tab";
import Inputbar from "../../../components/Inputbar/Inputbar";
import Button from "../../../components/Button/Button";
import Chapter from "../../../components/Chapter/Chapter";
import NPC from "../../../components/NPC/NPC";
import Monster from "../../../components/Monster/Monster";

import * as actions from "../../../store/actions/actionsIndex";

const classes = { ...classes1, ...classes2 };

const ContentWrapperLeft = (props) => {
  const activeContentHandler = (activeTab) => {
    const chaptersList = props.chapters.map((chapter) => (
      <Chapter key={chapter.id} id={chapter.id} name={chapter.name} />
    ));

    const npcsList = props.npcs.map((npc) => {
      return !npc.disabled ? (
        <NPC
          key={npc.id}
          id={npc.id}
          name={npc.value}
          description={npc.description}
          content={npc.content}
        />
      ) : null;
    });

    const monstersList = props.monsters.map((monster) => {
      return !monster.disabled ? (
        <Monster
          key={monster.id}
          id={monster.id}
          name={monster.value}
          description={monster.description}
          content={monster.content}
        />
      ) : null;
    });

    switch (activeTab) {
      case "Chapters":
        return chaptersList;
      case "NPCs":
        return npcsList;
      case "Monsters":
        return monstersList;
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
        <Tab
          contentType={"Monsters"}
          clicked={() => props.activeTabHandler("Monsters")}
        >
          Monsters
        </Tab>
        <Tab>Locations</Tab>
      </section>
      <hr className={classes.TabDivider} />
      <section className={classes.CardToolbar}>
        <Inputbar type="search" placeholder="Search for anything..." />
        <Button size={"big"}>
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
    monsters: state.contentData.monsters,
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
