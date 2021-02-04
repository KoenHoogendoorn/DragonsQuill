import React, { Component } from "react";

import { connect } from "react-redux";
import ReactQuill from "react-quill";
import * as actions from "../../../store/actions/actionsIndex";

import "react-quill/dist/quill.snow.css";
import "./NPCEditor.scss";
import "../../../shared/quillEditorOverall.scss";

import CardBackground from "../../Card/CardBackground/CardBackground";
import NPCEditorToolbar from "./NPCEditorToolbar/NPCEditorToolbar";

class NPCEditor extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      key: "",
      value: "",
      description: "",
      content: null,
      open: false,
      editingExistingNPC: false
    };
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }

  componentDidMount() {
    //Fill state with clicked item props
    if (this.props.id !== "") {
      this.setState((state, props) => ({
        id: props.id,
        key: props.id,
        value: props.value,
        description: props.description,
        content: props.content,
        open: false,
        editingExistingNPC: true
      }));
    }
    //Creates and sets new id and key
    if (!this.state.editingExistingNPC) {
      const Chapters = this.props.chapters;
      const NPCs = this.props.npcs;
      const Monsters = this.props.npcs;
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
        default:
          break;
      }

      const generatedIdNumber = Math.max(...idNumbers) + 1; //gets Id with highest number at the end and add 1
      const generatedId = currentIdPrefix.concat(generatedIdNumber.toString());

      this.setState({ id: generatedId, key: generatedId });
    }

    if (this.props.activeTab !== "Chapters") {
      this.attachQuillRefs();
    }
  }

  componentDidUpdate() {
    if (this.props.activeTab !== "Chapters") {
      this.attachQuillRefs();
    }
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleNameChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleContentChange = () => {
    const html = this.quillRef.root.innerHTML;
    this.setState({ content: html });
  };

  handleDelete = () => {
    this.setState({
      id: "",
      key: "",
      value: "",
      description: "",
      content: null,
      open: false,
      editingExistingNPC: false
    });
    this.props.removeNewNNPCCard();
  };

  handleSave = () => {
    if (this.state.editingExistingNPC) {
      //remove old copied item
      this.props.removeNPCHandler(this.props.id);
    }
    if (this.props.activeTab === "Chapters") {
      this.props.addNPCHandler({
        id: this.state.id,
        key: this.state.id,
        value: this.state.value
      });
    } else {
      this.props.addNPCHandler({
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
      container: ".toolbarNPC"
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
        <div className="NPCEditor">
          <input
            className="NPCEditorName"
            value={this.state.value}
            onChange={this.handleNameChange}
            placeholder="Character name..."
          ></input>
          <input
            className="NPCEditorDescription"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            placeholder="Species &amp; gender, Alignment......"
          ></input>

          <ReactQuill
            theme="snow"
            value={this.state.content}
            onChange={this.handleContentChange || ""}
            modules={this.modules}
            placeholder="Character description..."
            ref={(el) => {
              this.reactQuillRef = el;
            }}
          />
          <NPCEditorToolbar
            onDelete={() => this.handleDelete()}
            onSave={() => this.handleSave()}
            editingExistingNPC={this.state.editingExistingNPC}
            hasEditor={true}
          />
        </div>
      </CardBackground>
    );

    let chapterEditor = (
      <CardBackground id="newCard">
        <div className="NPCEditor">
          <input
            className="NPCEditorName"
            value={this.state.value}
            onChange={this.handleNameChange}
            placeholder="Chapter name..."
          ></input>
          <NPCEditorToolbar
            onDelete={() => this.handleDelete()}
            onSave={() => this.handleSave()}
            hasEditor={false}
          />
        </div>
      </CardBackground>
    );

    let editorContent = () => {
      //this.props.activeTab === "Chapters" ? chapterEditor : NPCorMonster;
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
    activeTab: state.activeTab.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeNPCHandler: (id) => dispatch(actions.removeNPC(id)),
    addNPCHandler: (npc) => dispatch(actions.addNPC(npc)),
    sortContentHandler: (id) => dispatch(actions.sortContent(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NPCEditor);
