import React, { Component } from "react";

import { connect } from "react-redux";
import ReactQuill from "react-quill";
import * as actions from "../../../store/actions/actionsIndex";

import "react-quill/dist/quill.snow.css";
import "./NewNPC.css";
import classes from "../../Card/Card.module.css";
import "../../../shared/quillEditorOverall.css";

import Card from "../../Card/Card";
import NewNPCEditorToolbar from "./NewNPCEditorToolbar/NewNPCEditorToolbar";

class NewNPC extends Component {
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
      <Card id={"newCard"}>
        <div className="NewNPC">
          <section className={classes.CardHeader}>
            <div>
              <input
                className="NewNPCName"
                value={this.state.value}
                onChange={this.handleNameChange}
                placeholder="Character name..."
              ></input>
              <input
                className="NewNPCDescription"
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
          <NewNPCEditorToolbar
            onDelete={() => this.handleDelete()}
            onSave={() => this.handleSave()}
          />
        </div>
      </Card>
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
    addNPCHandler: (newNPC) => dispatch(actions.addNPC(newNPC)),
    sortContentHandler: (id) => dispatch(actions.sortContent(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNPC);
