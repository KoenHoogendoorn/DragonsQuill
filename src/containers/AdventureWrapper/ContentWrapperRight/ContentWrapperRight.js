import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import { connect } from "react-redux";
import "quill-mention";

import "react-quill/dist/quill.snow.css";
import "quill-mention/dist/quill.mention.css";
import classes from "../AdventureWrapper.module.scss";
import "./ContentWrapperRight.scss";
import "../../../shared/quillEditorOverall.scss";

import EditorToolbar from "./EditorToolbar/EditorToolbar";
import EditorHeader from "./EditorHeader/EditorHeader";

import * as actions from "../../../store/actions/actionsIndex";

const icons = Quill.import("ui/icons");
icons["bold"] = '<i class="fas fa-bold" aria-hidden="true"></i>';
icons["italic"] = '<i class="fas fa-italic" aria-hidden="true"></i>';
icons["underline"] = '<i class="fas fa-underline" aria-hidden="true"></i>';
icons["link"] = '<i class="fas fa-link" aria-hidden="true"></i>';
icons["image"] = '<i class="far fa-image" aria-hidden="true"></i>';
icons["ul-list"] = '<i class="fas fa-list-ul" aria-hidden="true"></i>';
icons["ol-list"] = '<i class="fas fa-list-ol" aria-hidden="true"></i>';
icons["divider"] = '<i class="fas fa-minus" aria-hidden="true"></i>';
icons["blockquote"] = '<i class="fas fa-quote-right" aria-hidden="true"></i>';
icons["h1-icon"] = "H1";
icons["h2-icon"] = "H2";

let BlockEmbed = Quill.import("blots/block/embed");

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

Quill.register(DividerBlot);

function addDivider() {
  let range = this.quill.getSelection(true);
  this.quill.insertText(range.index, "\n", Quill.sources.USER);
  this.quill.insertEmbed(range.index + 1, "divider", true, Quill.sources.USER);
  this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
}

class ContentWrapperRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      chapterTextUpdate: "",
      mentionIdsArray: 0,
      ch1: ""
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    //adds uploaded chapter content to local state
    this.props.chapters.map((chapter) =>
      this.setState({ [chapter.id]: chapter.content })
    );

    //Er wordt in de landingpage bepaald welke content hier wordt ingeladen (nieuw/demo/loadedcontent)
    if (this.props.chapters.length > 1) {
      this.setState({
        // alleen ch1 hoeft ingeladen te worden omdat dat de enige is die te zien is in de editor.
        ch1: `${this.props.chapters[1].content}`
      });
    }

    window.addEventListener("resize", this.updateDimensions);

    const Embed = Quill.import("blots/embed");

    class MentionBlot extends Embed {
      static create = (data) => {
        const node = super.create();
        const denotationChar = document.createElement("span");
        denotationChar.className = "ql-mention-denotation-char";
        denotationChar.innerHTML = data.denotationChar;
        // node.appendChild(denotationChar);
        node.innerHTML += data.value;
        //--

        //--
        node.addEventListener("click", () => MentionBlot.onClick(data.id));
        return MentionBlot.setDataValues(node, data);
      };

      static setDataValues(element, data) {
        const domNode = element;
        Object.keys(data).forEach((key) => {
          domNode.dataset[key] = data[key];
        });
        return domNode;
      }

      static value(domNode) {
        return domNode.dataset;
      }
    }

    MentionBlot.blotName = "dndmention";
    MentionBlot.tagName = "span";
    MentionBlot.className = "dndmention";
    MentionBlot.onClick = (id) => {
      if (this.state.width < 501) {
        this.props.setActiveContentWrapperLeft();
      }
      this.props.highlightCardHandler(id);
      let clickedItem = null;

      const clickCardHandler = (clickedItem) => {
        if (clickedItem.open) {
          //close card and unhighlight item
          this.props.toggleCardHandler(id);
          setTimeout(() => {
            //sort cards to make them go back in alfabetical order
            this.props.sortContentHandler();
          }, 175);
        } else {
          //togglecardhandler (opens card)
          this.props.toggleCardHandler(id);
        }
      };

      switch (id.substring(0, 2)) {
        case "np":
          this.props.closeCardsHandler("NPCs");
          this.props.activeTabHandler("NPCs");
          clickedItem = this.props.npcs.find((npc) => npc.id === id);
          clickCardHandler(clickedItem);
          break;
        case "mo":
          this.props.closeCardsHandler("Monsters");
          this.props.activeTabHandler("Monsters");
          clickedItem = this.props.monsters.find(
            (monster) => monster.id === id
          );
          clickCardHandler(clickedItem);
          break;
        case "lo":
          this.props.closeCardsHandler("Locations");
          this.props.activeTabHandler("Locations");
          clickedItem = this.props.locations.find(
            (location) => location.id === id
          );
          clickCardHandler(clickedItem);
          break;
        default:
          break;
      }
    };

    Quill.register(MentionBlot);
  }

  findDeletedValueType(prevContentArray, currentContentArray, valueType) {
    const difference = prevContentArray.filter(
      (element) => currentContentArray.indexOf(element) === -1
    );
    return difference[0][valueType];
  }

  replaceMentionWithName(chapterId, deletedId, deletedName) {
    const chapterValueWithCommas = this.state[chapterId].replace(
      /<span/g,
      "8f523@gh4@mjg7<span"
    );
    const chapterValueWithCommas2 = chapterValueWithCommas.replace(
      /<\/span>/g,
      "8f523@gh4@mjg7</span>8f523@gh4@mjg7"
    );
    // Split the array at hashes
    const chapterValueSplitted =
      chapterValueWithCommas2.split("8f523@gh4@mjg7");

    while (
      chapterValueSplitted.findIndex((el) => el.includes(deletedId)) > -1
    ) {
      // Find <span items with id that is being deleted
      let indexOfDeletedSpan = chapterValueSplitted.findIndex((el) =>
        el.includes(deletedId)
      );
      // Select and delete that item and the 4 items after it (span, span, /span, empty, /span), insert the item.value with the same id
      chapterValueSplitted.splice(indexOfDeletedSpan, 5, deletedName);
    }

    // maak weer een string van de array
    const spans = chapterValueSplitted.join("");
    this.setState({ [chapterId]: spans });
  }

  editMentionNameInEditor(activeChapterId) {
    // let currState = this.state[activeChapterId].slice();
    const oldName = this.props.editedName.oldName;
    const newName = this.props.editedName.newName;
    const toBeEditedId = this.props.editedName.id;
    const oldString =
      'data-id="' +
      toBeEditedId +
      '" data-value="' +
      oldName +
      '">&#65279;<span contenteditable="false">' +
      oldName +
      "</span>";
    const newString =
      'data-id="' +
      toBeEditedId +
      '" data-value="' +
      newName +
      '">&#65279;<span contenteditable="false">' +
      newName +
      "</span>";

    //loop through all chapters
    //find all instances of the html in the current state and
    //replace the name in data-value and innerHtml
    Object.keys(this.state).forEach((property) => {
      if (property.substring(0, 2) === "ch") {
        const updatedState = this.state[property].replace(
          new RegExp(oldString, "g"),
          newString
        );
        this.setState({ [property]: updatedState });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const activeChapterId = this.props.activeChapterId;
    if (
      prevProps.editedName.id !== this.props.editedName.id &&
      this.props.editedName.id !== ""
    ) {
      this.editMentionNameInEditor(activeChapterId);
      this.props.editedNameHandler("", "", ""); //reset editedNameHandler so this function doesn't repeat
    }

    // set width to fixed item (editor)
    const wrapperRightBlock = document.getElementById("WrapperRightBlock");
    if (this.state.width <= 1480) {
      wrapperRightBlock.style.width = (this.state.width * 0.9) / 2 + "px";
    }

    if (this.state.width < 501) {
      wrapperRightBlock.style.width = "100%";
    }

    // loop through value of activeChapter, find and extract ids and add them to redux state
    if (prevState[activeChapterId] !== this.state[activeChapterId]) {
      const chapterValueSplitted = this.state[activeChapterId].split(" ");
      let dataMentionIds = chapterValueSplitted.filter(
        (item) => item.substring(0, 8) === "data-id="
      );
      const mentionIds = dataMentionIds.map((item) =>
        item.slice(9, item.length - 1)
      );
      this.setState({ mentionIdsArray: mentionIds });
    }
    if (prevState.mentionIdsArray !== this.state.mentionIdsArray) {
      this.props.changeMentionCountersHandler(
        this.state.mentionIdsArray,
        activeChapterId
      );
    }

    // if an npc gets deleted, copy the name and remove the mention. Place name where mention would be.
    if (this.props.npcs.length < prevProps.npcs.length) {
      const deletedId = this.findDeletedValueType(
        prevProps.npcs,
        this.props.npcs,
        "id"
      );

      const deletedName = this.findDeletedValueType(
        prevProps.npcs,
        this.props.npcs,
        "value"
      );

      this.props.chapters.forEach((chapter) => {
        if (chapter.id !== "ch0") {
          this.replaceMentionWithName(chapter.id, deletedId, deletedName);
        }
      });
    }

    // if a monster gets deleted, copy the name and remove the mention. Place name where mention would be.
    if (this.props.monsters.length < prevProps.monsters.length) {
      const deletedId = this.findDeletedValueType(
        prevProps.monsters,
        this.props.monsters,
        "id"
      );
      const deletedName = this.findDeletedValueType(
        prevProps.monsters,
        this.props.monsters,
        "value"
      );

      this.props.chapters.forEach((chapter) => {
        if (chapter.id !== "ch0") {
          this.replaceMentionWithName(chapter.id, deletedId, deletedName);
        }
      });
    }

    // if a location gets deleted, copy the name and remove the mention. Place name where mention would be.
    if (this.props.locations.length < prevProps.locations.length) {
      const deletedId = this.findDeletedValueType(
        prevProps.locations,
        this.props.locations,
        "id"
      );
      const deletedName = this.findDeletedValueType(
        prevProps.locations,
        this.props.locations,
        "value"
      );
      this.props.chapters.forEach((chapter) => {
        if (chapter.id !== "ch0") {
          this.replaceMentionWithName(chapter.id, deletedId, deletedName);
        }
      });
    }

    //if text gets changed, change the replica in contentData
    //find item in contentData chapter that has the same id as current active chapter id from this local state
    if (
      //if local state changes
      prevState[activeChapterId] !== this.state[activeChapterId] &&
      this.props.chapters.length > 1 // only do this when there's a chapter that can contain content
    ) {
      // Find index of current chapter
      const index = this.props.chapters.findIndex((chapter) => {
        return chapter.id === activeChapterId;
      });

      const currentValue = this.props.chapters[index].value;
      const currentMentionIds = this.props.chapters[index].mentionIds;
      const currentContent = this.state[activeChapterId].slice();

      this.props.removeCardHandler(activeChapterId); //remove current chapter data
      this.props.addCardHandler({
        //add new chapter data
        id: activeChapterId,
        key: activeChapterId,
        value: currentValue,
        content: currentContent,
        mentionIds: currentMentionIds
      });
      //make sure everythings sorted
      this.props.sortContentHandler();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  modules = {
    toolbar: {
      container: ".toolbarChapter",
      handlers: {
        divider: addDivider
      }
    },
    mention: {
      blotName: "dndmention",
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      showDenotationChar: false,
      dataAttributes: ["id", "value", "denotationChar", "target"],
      source: (searchTerm, renderList, mentionChar) => {
        let values = this.props.npcs.concat(
          this.props.monsters,
          this.props.locations
        );

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
      // renderItem controls how item in dropdown looks
      renderItem: (item, searchTerm) => {
        return `${item.value}`;
      }
    }
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "divider",
    "dndmention",
    "mention"
  ];

  render() {
    let numberOfChapters = this.props.chapters.length;

    return (
      <div
        id="WrapperRightBlock"
        className={`${classes.ContentWrapper} ${classes.WrapperRightBlock} ${this.props.addedClassesRight}`}
      >
        <EditorHeader />
        <EditorToolbar />
        <div className="WrapperRightContent">
          <ReactQuill
            theme="snow"
            //put input from user into new state property named after chapter id
            onChange={(event) =>
              this.setState({ [this.props.activeChapterId]: event })
            }
            modules={this.modules}
            placeholder={
              numberOfChapters === 1
                ? "Add a chapter to start writing"
                : "Start writing here. Mention something by typing '@'..."
            }
            formats={this.formats}
            value={this.state[this.props.activeChapterId] || ""}
            preserveWhitespace={true}
            // you can only write in editor if there is a chapter
            readOnly={numberOfChapters === 1 ? true : false}
          />
        </div>
      </div>
    );
  }
}

//----

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    chapters: state.contentData.chapters,
    locations: state.contentData.locations,
    activeChapterId: state.activeChapterId.activeChapterId,
    editedName: state.editedName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeTabHandler: (contentType) => dispatch(actions.activeTab(contentType)),
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id)),
    highlightCardHandler: (id) => dispatch(actions.highlightCard(id)),
    removeCardHandler: (id) => dispatch(actions.removeCard(id)),
    addCardHandler: (itemData) => dispatch(actions.addCard(itemData)),
    sortContentHandler: (id) => dispatch(actions.sortContent(id)),
    closeCardsHandler: (newActiveTab) =>
      dispatch(actions.closeCards(newActiveTab)),
    changeMentionCountersHandler: (mentionIds, activeChapterId) =>
      dispatch(actions.changeMentionCounters(mentionIds, activeChapterId)),
    editedNameHandler: (oldName, newName, id) =>
      dispatch(actions.editedName(oldName, newName, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapperRight);
