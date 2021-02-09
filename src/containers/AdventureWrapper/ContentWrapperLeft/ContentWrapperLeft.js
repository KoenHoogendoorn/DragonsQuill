import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import classes1 from "../AdventureWrapper.module.scss";
import classes2 from "./ContentWrapperLeft.module.scss";

import Inputbar from "../../../components/Inputbar/Inputbar";
import Button from "../../../components/Button/Button";
import Chapter from "../../../components/Chapter/Chapter";
import NPC from "../../../components/NPC/NPC";
import NPCEditor from "../../../components/NPC/NPCEditor/NPCEditor";
import TabsContainer from "./TabsContainer/TabsContainer";

import * as actions from "../../../store/actions/actionsIndex";

const classes = { ...classes1, ...classes2 };

const ContentWrapperLeft = (props) => {
  const initialItemState = {
    id: "",
    key: "",
    value: "",
    description: "",
    content: null,
    open: false
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [addingChapter, setAddingChapter] = useState(false);
  const [addingNPC, setAddingNPC] = useState(false);
  const [addingMonster, setAddingMonster] = useState(false);
  const [addingLocation, setAddingLocation] = useState(false);

  //extract keys from props for dependencies
  const { sortContentHandler } = props;

  useEffect(() => {
    sortContentHandler();
  }, [sortContentHandler]);

  const editSearchTerm = (input) => {
    setSearchTerm(input.target.value);
  };

  const newContentButtonHandler = () => {
    switch (props.activeTab) {
      case "Chapters":
        return setAddingChapter(true);
      case "NPCs":
        return setAddingNPC(true);
      case "Monsters":
        return setAddingMonster(true);
      case "Locations":
        return setAddingLocation(true);
      default:
        break;
    }
  };

  const cancelEditingExistingCard = () => {
    setCurrentItem(initialItemState);
    switch (props.activeTab) {
      case "Chapters":
        return setAddingChapter(false);
      case "NPCs":
        return setAddingNPC(false);
      case "Monsters":
        return setAddingMonster(false);
      case "Locations":
        return setAddingLocation(false);
      default:
        break;
    }
  };

  const activeNewContentCardHandler = () => {
    if (addingChapter || addingNPC || addingMonster || addingLocation) {
      return (
        <NPCEditor
          id={currentItem.id}
          key={currentItem.id}
          value={currentItem.value}
          description={currentItem.description}
          content={currentItem.content}
          open={currentItem.open}
          removeNewNNPCCard={() => cancelEditingExistingCard()}
        />
      );
    } else {
      return null;
    }
  };

  const editItemHandler = (item) => {
    item.open = false;
    setCurrentItem(item);
    switch (props.activeTab) {
      case "NPCs":
        return setAddingNPC(true);
      case "Monsters":
        return setAddingMonster(true);
      case "Locations":
        return setAddingLocation(true);
      default:
        break;
    }
  };

  const activeContentHandler = () => {
    const chaptersList = () => {
      return props.chapters
        .filter((chapter) =>
          chapter.value.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((chapter) => {
          return chapter.value !== "Chapters" ? (
            <Chapter key={chapter.id} id={chapter.id} value={chapter.value} />
          ) : null;
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
        .filter(
          (npc) =>
            npc.value.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            npc.id !== currentItem.id
        )
        .map((npc) => {
          return !npc.disabled ? (
            <NPC
              key={npc.id}
              id={npc.id}
              value={npc.value}
              description={npc.description}
              content={npc.content}
              open={npc.open}
              onEditClick={() => editItemHandler(npc)}
            />
          ) : null;
        });
    };

    const monstersList = () => {
      //if an item is open, but dissapears because of another search term,
      //the open property is set to false
      props.monsters.forEach((monster) => {
        if (!monster.value.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          monster.open = false;
        }
      });
      return props.monsters
        .filter(
          (monster) =>
            monster.value.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            monster.id !== currentItem.id
        )
        .map((monster) => {
          return !monster.disabled ? (
            <NPC
              key={monster.id}
              id={monster.id}
              value={monster.value}
              description={monster.description}
              content={monster.content}
              open={monster.open}
              onEditClick={() => editItemHandler(monster)}
            />
          ) : null;
        });
    };

    const locationsList = () => {
      //if an item is open, but dissapears because of another search term,
      //the open property is set to false
      props.locations.forEach((location) => {
        if (
          !location.value.toLowerCase().startsWith(searchTerm.toLowerCase())
        ) {
          location.open = false;
        }
      });
      return props.locations
        .filter(
          (location) =>
            location.value.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            location.id !== currentItem.id
        )
        .map((location) => {
          return !location.disabled ? (
            <NPC
              key={location.id}
              id={location.id}
              value={location.value}
              description={location.description}
              content={location.content}
              open={location.open}
              onEditClick={() => editItemHandler(location)}
            />
          ) : null;
        });
    };

    const noItemsYet = (
      <h4>
        Add some {props.activeTab.toLowerCase()} by clicking the purple button
        above.
      </h4>
    );

    const emptySearchResults = (
      <h4>No {props.activeTab.toLowerCase()} found.</h4>
    );

    switch (props.activeTab) {
      case "Chapters":
        if (props.chapters.length === 1 && addingChapter === false) {
          return noItemsYet;
        }
        if (chaptersList().length > 0) {
          return chaptersList();
        } else if (addingChapter === false) {
          return emptySearchResults;
        }
        break;
      case "NPCs":
        if (props.npcs.length === 1 && addingNPC === false) {
          return noItemsYet;
        }
        if (npcsList().length > 0) {
          return npcsList();
        } else if (addingNPC === false) {
          return emptySearchResults;
        }
        break;
      case "Monsters":
        if (props.monsters.length === 1 && addingMonster === false) {
          return noItemsYet;
        }
        if (monstersList().length > 0) {
          return monstersList();
        } else if (addingMonster === false) {
          return emptySearchResults;
        }
        break;
      case "Locations":
        if (props.locations.length === 1 && addingLocation === false) {
          return noItemsYet;
        }
        if (locationsList().length > 0) {
          return locationsList();
        } else if (addingLocation === false) {
          return emptySearchResults;
        }
        break;
      default:
        return chaptersList();
    }
  };

  let buttonText = "Add " + props.activeTab.slice(0, -1);

  return (
    <div className={`${classes.ContentWrapper} ${classes.WrapperLeft}`}>
      <h1>Adventure Title</h1>
      <TabsContainer
        tabsContainerClasses={classes.Tabs}
        cancelEditingCard={cancelEditingExistingCard}
      />
      <hr className={classes.TabDivider} />
      <section className={classes.CardToolbar}>
        <Inputbar
          type="search"
          placeholder={`Search for ${props.activeTab}...`}
          val={searchTerm}
          changed={editSearchTerm}
        />
        <i className={`fas fa-search ${classes.SearchIcon}`}></i>
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
      <section id="CardsContainer">{activeContentHandler()}</section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chapters: state.contentData.chapters,
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    locations: state.contentData.locations,
    activeTab: state.activeTab.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortContentHandler: () => dispatch(actions.sortContent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperLeft);
