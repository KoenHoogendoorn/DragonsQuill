import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import classes1 from "../AdventureWrapper.module.scss";
import classes2 from "./ContentWrapperLeft.module.scss";

import Inputbar from "../../../components/Inputbar/Inputbar";
import Button from "../../../components/Button/Button";
import Chapter from "../../../components/Chapter/Chapter";
import CardItem from "../../../components/CardItem/CardItem";
import CardItemEditor from "../../../components/CardItem/CardItemEditor/CardItemEditor";
import TabsContainer from "./TabsContainer/TabsContainer";
import Modal from "../../../components/Modal/Modal";
import Logo from "../../../assets/logo/DragonsQuillLogo";
import DownloadFileButton from "../../../components/DownloadFileButton/DownloadFileButton";
import UploadFileInput from "../../../components/UploadFileInput/UploadFileInput";

import DeleteItemIllustration from "../../../assets/illustrations/DeleteItemIllustration";

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
  const [deleting, setDeleting] = useState(false);
  const [toBeDeletedItem, setToBeDeletedItem] = useState({
    id: "",
    name: ""
  });

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

  const cancelEditingCard = () => {
    setCurrentItem(initialItemState);

    switch (props.activeTab) {
      case "Chapters":
        setAddingChapter(false);
        break;
      case "NPCs":
        setAddingNPC(false);
        break;
      case "Monsters":
        setAddingMonster(false);
        break;
      case "Locations":
        setAddingLocation(false);
        break;
      default:
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const activeNewContentCardHandler = () => {
    if (addingChapter || addingNPC || addingMonster || addingLocation) {
      if (currentItem.id !== initialItemState.id) {
        //editing existing card
        return (
          <CardItemEditor
            id={currentItem.id}
            key={currentItem.id}
            value={currentItem.value}
            description={currentItem.description}
            content={currentItem.content}
            open={currentItem.open}
            editingExistingCardItem={true}
            removeNewCardItemCard={() => cancelEditingCard()}
          />
        );
      } else {
        //editing new card
        return (
          <CardItemEditor
            id={currentItem.id}
            key={currentItem.id}
            value={currentItem.value}
            description={currentItem.description}
            content={currentItem.content}
            open={currentItem.open}
            editingExistingCardItem={false}
            removeNewCardItemCard={() => cancelEditingCard()}
          />
        );
      }
    } else {
      return null;
    }
  };

  const editItemHandler = (item) => {
    item.open = false;
    setCurrentItem(item);
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

  const openDeleteItemModal = (id, name) => {
    setToBeDeletedItem({
      id: id,
      name: name
    });
    setDeleting(true);
  };

  const closeDeleteItemModal = (id, name) => {
    setToBeDeletedItem({
      id: "",
      name: ""
    });
    setDeleting(false);
  };

  const deleteItemHandler = () => {
    props.removeCardHandler(toBeDeletedItem.id);
    setToBeDeletedItem({
      id: "",
      name: ""
    });
    setDeleting(false);
  };

  const activeContentHandler = () => {
    const chaptersList = () => {
      return props.chapters
        .filter(
          (chapter) =>
            chapter.value.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
            chapter.id !== currentItem.id
        )
        .map((chapter) => {
          return chapter.value !== "Chapters" ? (
            <Chapter
              key={chapter.id}
              id={chapter.id}
              value={chapter.value}
              onDeleteClick={() =>
                openDeleteItemModal(chapter.id, chapter.value)
              }
              onEditClick={() => editItemHandler(chapter)}
            />
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
            <CardItem
              key={npc.id}
              id={npc.id}
              value={npc.value}
              description={npc.description}
              content={npc.content}
              open={npc.open}
              onDeleteClick={() => openDeleteItemModal(npc.id, npc.value)}
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
            <CardItem
              key={monster.id}
              id={monster.id}
              value={monster.value}
              description={monster.description}
              content={monster.content}
              open={monster.open}
              onDeleteClick={() =>
                openDeleteItemModal(monster.id, monster.value)
              }
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
            <CardItem
              key={location.id}
              id={location.id}
              value={location.value}
              description={location.description}
              content={location.content}
              open={location.open}
              onDeleteClick={() =>
                openDeleteItemModal(location.id, location.value)
              }
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

  const deleteItemModalContent = (
    <div className={classes.DeleteItemModalContent}>
      <DeleteItemIllustration />
      <h4>Delete '{toBeDeletedItem.name}'?</h4>
      <p>It can't be recovered.</p>
      <div className={classes.DeleteItemModalButtons}>
        <Button
          size="medium"
          priority="secondary"
          iconPlacement="left"
          clicked={() => closeDeleteItemModal()}
        >
          <i className="fas fa-ban"></i>
          Cancel
        </Button>
        <Button
          size="medium"
          priority="primary"
          iconPlacement="left"
          clicked={() => deleteItemHandler()}
        >
          <i className="far fa-trash-alt"></i>
          Delete
        </Button>
      </div>
    </div>
  );

  let buttonText = "Add " + props.activeTab.slice(0, -1);

  return (
    <React.Fragment>
      <Modal show={deleting} modalClosed={() => setDeleting(false)}>
        {deleteItemModalContent}
      </Modal>
      <div
        className={`${classes.ContentWrapper} ${classes.WrapperLeft} ${props.addedClassesLeft}`}
      >
        <div className={classes.HeaderBar}>
          <Logo classes={classes.Logo} />
          <DownloadFileButton />
          <UploadFileInput />
        </div>

        <h1>{props.adventure.value}</h1>
        <TabsContainer
          tabsContainerClasses={classes.Tabs}
          cancelEditingCard={cancelEditingCard}
          clearSearch={clearSearch}
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
            iconPlacement="left"
            clicked={() => newContentButtonHandler()}
          >
            <i className="fas fa-plus"></i>
            {buttonText}
          </Button>
        </section>
        {activeNewContentCardHandler()}
        <section id="CardsContainer">{activeContentHandler()}</section>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    adventure: state.contentData.adventure,
    chapters: state.contentData.chapters,
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    locations: state.contentData.locations,
    activeTab: state.activeTab.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortContentHandler: () => dispatch(actions.sortContent()),
    removeCardHandler: (id) => dispatch(actions.removeCard(id)),
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapperLeft);
