import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import classes1 from "../AdventureWrapper.module.css";
import classes2 from "./ContentWrapperLeft.module.css";

import Tab from "../../../components/Tab/Tab";
import Inputbar from "../../../components/Inputbar/Inputbar";
import Button from "../../../components/Button/Button";
import Chapter from "../../../components/Chapter/Chapter";
import NPC from "../../../components/NPC/NPC";
import NPCEditor from "../../../components/NPC/NPCEditor/NPCEditor";

import * as actions from "../../../store/actions/actionsIndex";

const classes = { ...classes1, ...classes2 };

const ContentWrapperLeft = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [addingChapter, setAddingChapter] = useState(false);
  const [addingNPC, setAddingNPC] = useState(false);
  // const [addingMonster, setAddingMonster] = useState(false);

  useEffect(() => {
    props.sortContentHandler();
  }, []);

  const editSearchTerm = (input) => {
    setSearchTerm(input.target.value);
  };

  const activeContentHandler = () => {
    const chaptersList = () => {
      return props.chapters
        .filter((chapter) =>
          chapter.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((chapter) => {
          return (
            <Chapter key={chapter.id} id={chapter.id} name={chapter.name} />
          );
        });
    };

    const npcsList = () => {
      //if an item is open, but dissapears because of another search term,
      //the open property is set to false
      props.npcs.forEach((npc) => {
        if (!npc.value.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          npc.open = false;
        }
      });
      return props.npcs
        .filter((npc) =>
          npc.value.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((npc) => {
          return !npc.disabled ? (
            <NPC
              key={npc.id}
              id={npc.id}
              name={npc.value}
              description={npc.description}
              content={npc.content}
              open={npc.open}
            />
          ) : null;
        });
    };

    const monstersList = () => {
      props.monsters.forEach((monster) => {
        if (!monster.value.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          monster.open = false;
        }
      });
      return props.monsters
        .filter((monster) =>
          monster.value.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((monster) => {
          return !monster.disabled ? (
            <NPC
              key={monster.id}
              id={monster.id}
              name={monster.value}
              description={monster.description}
              content={monster.content}
              open={monster.open}
            />
          ) : null;
        });
    };

    switch (props.activeTab) {
      case "Chapters":
        return chaptersList();
      case "NPCs":
        return npcsList();
      case "Monsters":
        return monstersList();
      default:
        return chaptersList();
    }
  };

  const newContentButtonHandler = () => {
    switch (props.activeTab) {
      // case "Chapters":
      //   return setAddingChapter(true);
      case "NPCs":
        return setAddingNPC(true);
      // case "Monsters":
      //   return setAddingMonster(true);
      default:
        break;
    }
  };

  const activeNewContentCardHandler = () => {
    if (addingNPC) {
      return <NPCEditor removeNewNNPCCard={() => setAddingNPC(false)} />;
    } else {
      return null;
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
        <Inputbar
          type="search"
          placeholder={`Search for ${props.activeTab}...`}
          val={searchTerm}
          changed={editSearchTerm}
        />
        <Button
          size="big"
          priority="primary"
          clicked={() => newContentButtonHandler()}
        >
          <i className="fas fa-plus"></i>
          {buttonText}
        </Button>
      </section>
      {activeNewContentCardHandler()}
      <section className={classes.CardsContainer}>
        {activeContentHandler()}
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
    activeTabHandler: (contentType) => dispatch(actions.activeTab(contentType)),
    sortContentHandler: () => dispatch(actions.sortContent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperLeft);
