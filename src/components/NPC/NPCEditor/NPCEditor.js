import React, { Component } from "react";

import { connect } from "react-redux";
import ReactQuill from "react-quill";
import * as actions from "../../../store/actions/actionsIndex";

import "react-quill/dist/quill.snow.css";
import "./NPCEditor.css";
import classes from "../../Card/CardBackground/CardBackground.module.css";
import "../../../shared/quillEditorOverall.css";

import CardBackground from "../../Card/CardBackground/CardBackground";
import NPCEditorEditorToolbar from "./NPCEditorEditorToolbar/NPCEditorEditorToolbar";

class NPCEditor extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      key: "",
      value: "",
      description: "",
      content: null,
      open: false
    };
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }

  componentDidMount() {
    //Creates and sets new id and key
    const NPCs = this.props.npcs;
    const generatedId = `np${NPCs.length}`;
    this.setState({
      id: generatedId,
      key: generatedId
    });

    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleNameChange = (name) => {
    this.setState({ value: name.target.value });
  };

  handleDescriptionChange = (desc) => {
    this.setState({ description: desc.target.value });
  };

  handleContentChange = (html) => {
    const htmll = this.quillRef.root.innerHTML;
    this.setState({ content: htmll });
  };

  handleDelete = () => {
    this.setState({ id: "", value: "", description: "", content: null });
    this.props.removeNewNNPCCard();
  };

  handleSave = () => {
    this.props.addNPCHandler(this.state);
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
    return (
      <CardBackground id={"newCard"}>
        <div className="NPCEditor">
          <section className={classes.CardHeader}>
            <div>
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
            </div>
          </section>
          <ReactQuill
            theme="snow"
            value={this.state.content}
            onChange={this.handleContentChange}
            modules={this.modules}
            placeholder="Character description..."
            ref={(el) => {
              this.reactQuillRef = el;
            }}
          />
          <NPCEditorEditorToolbar
            onDelete={() => this.handleDelete()}
            onSave={() => this.handleSave()}
          />
        </div>
      </CardBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNPCHandler: (NPCEditor) => dispatch(actions.addNPC(NPCEditor)),
    sortContentHandler: (id) => dispatch(actions.sortContent(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NPCEditor);
