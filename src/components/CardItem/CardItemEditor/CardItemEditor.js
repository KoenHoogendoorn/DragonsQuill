import React, { Component } from "react";

import { connect } from "react-redux";
import ReactQuill from "react-quill";
import * as actions from "../../../store/actions/actionsIndex";

import "react-quill/dist/quill.snow.css";
import "./CardItemEditor.scss";
import "../../../shared/quillEditorOverall.scss";

import CardBackground from "../../CardParts/CardBackground/CardBackground";
import CardItemEditorToolbar from "./CardItemEditorToolbar/CardItemEditorToolbar";
import CardItemEditorWarning from "./CardItemEditorWarning/CardItemEditorWarning";

class CardItemEditor extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      key: "",
      value: "",
      description: "",
      content: null,
      open: false,
      fadeout: false,
      CardItemEditorWarning: false
    };

    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  componentDidMount() {
    this.setState({
      id: this.props.id,
      key: this.props.key,
      value: this.props.value,
      description: this.props.description,
      content: this.props.content,
      open: this.props.open,
      editingExistingCardItem: this.props.editingExistingCardItem
    });

    if (this.props.activeTab !== "Chapters") {
      this.attachQuillRefs();
    }
  }

  generateId = () => {
    //Creates and sets new id and key
    const Chapters = this.props.chapters;
    const NPCs = this.props.npcs;
    const Monsters = this.props.npcs;
    const Locations = this.props.locations;
    let idNumbers = null;
    let currentIdPrefix = null;
    switch (this.props.activeTab) {
      case "Chapters":
        idNumbers = Chapters.map((chapter) => chapter.id).map((id) => {
          return Number(id.substring(2));
        });
        currentIdPrefix = "ch";
        break;
      case "NPCs":
        idNumbers = NPCs.map((npc) => npc.id).map((id) => {
          return Number(id.substring(2));
        });
        currentIdPrefix = "np";
        break;
      case "Monsters":
        idNumbers = Monsters.map((monster) => monster.id).map((id) => {
          return Number(id.substring(2));
        });
        currentIdPrefix = "mo";
        break;
      case "Locations":
        idNumbers = Locations.map((location) => location.id).map((id) => {
          return Number(id.substring(2));
        });
        currentIdPrefix = "lo";
        break;
      default:
        break;
    }

    const generatedIdNumber = Math.max(...idNumbers) + 1; //gets Id with highest number at the end and add 1
    const generatedId = currentIdPrefix.concat(generatedIdNumber.toString());

    this.setState({ id: generatedId, key: generatedId });
  };

  componentDidUpdate() {
    if (this.state.id === "") {
      this.generateId();
    }
    if (this.props.activeTab !== "Chapters") {
      this.attachQuillRefs();
    }

    // remove warning when value is starting to be filled with a fadeout
    if (
      this.state.CardItemEditorWarning &&
      this.state.value.trim() !== "" &&
      !this.state.fadeout
    ) {
      this.setState({ fadeout: true });
      setTimeout(() => {
        this.setState({ CardItemEditorWarning: false });
        this.setState({ fadeout: false });
      }, 175);
    }
  }

  handleNameChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleNamePlaceholder = () => {
    switch (this.props.activeTab) {
      case "NPCs":
        return "Character name...";
      case "Monsters":
        return "Monster name...";
      case "Locations":
        return "Location name...";
      default:
        break;
    }
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleDescriptionPlaceholder = () => {
    switch (this.props.activeTab) {
      case "NPCs":
        return "Species & gender, Alignment...";
      case "Monsters":
        return "Size & species, Alignment...";
      case "Locations":
        return "Size & settlement type...";
      default:
        break;
    }
  };

  handleContentChange = () => {
    const html = this.quillRef.root.innerHTML;
    this.setState({ content: html });
  };

  handleContentPlaceholder = () => {
    switch (this.props.activeTab) {
      case "NPCs":
        return "Character description...";
      case "Monsters":
        return "Monster description...";
      case "Locations":
        return "Location description...";
      default:
        break;
    }
  };

  handleDelete = () => {
    this.setState({
      id: "",
      key: "",
      value: "",
      description: "",
      content: null,
      open: false,
      editingExistingCardItem: false
    });
    this.props.removeNewCardItemCard();
  };

  handleSave = () => {
    const value = this.state.value;

    if (value.trim() === "") {
      this.setState({ CardItemEditorWarning: true });
      return;
    }

    if (this.state.editingExistingCardItem) {
      //remove old copied item
      this.props.removeCardHandler(this.state.id);
      //triggers editMentionNameInEditor() in ContentWrapperRight when name changes
      if (
        this.props.value !== this.state.value &&
        this.props.activeTab !== "Chapters"
      ) {
        this.props.editedNameHandler(
          this.props.value,
          this.state.value,
          this.state.id
        );
      }
    }

    if (this.props.activeTab === "Chapters") {
      this.props.addCardHandler({
        id: this.state.id,
        key: this.state.id,
        value: this.state.value,
        mentionIds: {
          npc: [],
          monster: [],
          location: []
        }
      });
    } else {
      this.props.addCardHandler({
        id: this.state.id,
        key: this.state.id,
        value: this.state.value,
        description: this.state.description,
        content: this.state.content,
        open: false
      });
    }

    this.handleDelete();
    this.props.sortContentHandler();
  };

  modules = {
    toolbar: {
      container: ".toolbarCardItem"
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  render() {
    let NPCorMonster = (
      <CardBackground id="newCard">
        <div className="CardItemEditor">
          <input
            className="CardItemEditorName"
            value={this.state.value}
            onChange={this.handleNameChange}
            placeholder={this.handleNamePlaceholder()}
          ></input>
          <input
            className="CardItemEditorDescription"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            placeholder={this.handleDescriptionPlaceholder()}
          ></input>

          <ReactQuill
            theme="snow"
            value={this.state.content}
            onChange={this.handleContentChange || ""}
            modules={this.modules}
            placeholder={this.handleContentPlaceholder()}
            ref={(el) => {
              this.reactQuillRef = el;
            }}
          />
          {this.state.CardItemEditorWarning ? (
            <CardItemEditorWarning
              fadeout={this.state.fadeout}
              warning={this.state.CardItemEditorWarning}
            />
          ) : null}
          <CardItemEditorToolbar
            onDelete={() => this.handleDelete()}
            onSave={() => this.handleSave()}
            editingExistingCardItem={this.state.editingExistingCardItem}
            hasEditor={true}
          />
        </div>
      </CardBackground>
    );

    let chapterEditor = (
      <CardBackground id="newCard" chapterEditor={true}>
        <div className="CardItemEditor">
          <input
            className="CardItemEditorName"
            value={this.state.value}
            onChange={this.handleNameChange}
            placeholder="Chapter name..."
          ></input>
          {this.state.CardItemEditorWarning ? (
            <CardItemEditorWarning
              fadeout={this.state.fadeout}
              warning={this.state.CardItemEditorWarning}
            />
          ) : null}
          <CardItemEditorToolbar
            onDelete={() => this.handleDelete()}
            onSave={() => this.handleSave()}
            editingExistingCardItem={this.state.editingExistingCardItem}
            hasEditor={false}
          />
        </div>
      </CardBackground>
    );

    let editorContent = () => {
      if (this.props.activeTab === "Chapters") {
        return chapterEditor;
      } else {
        return NPCorMonster;
      }
    };

    return editorContent();
  }
}

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
    removeCardHandler: (id) => dispatch(actions.removeCard(id)),
    addCardHandler: (itemData) => dispatch(actions.addCard(itemData)),
    sortContentHandler: (id) => dispatch(actions.sortContent(id)),
    editedNameHandler: (oldName, newName, id) =>
      dispatch(actions.editedName(oldName, newName, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardItemEditor);
