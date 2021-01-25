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
  constructor(props) {
    super(props);
    this.state = { editorHtml: "" };
  }

  handleChange = (html) => {
    this.setState({ editorHtml: html });
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
      <Card>
        <div className="NewNPC">
          <section className={classes.CardHeader}>
            <div>
              <input
                className="NewNPCName"
                placeholder="Character name..."
              ></input>
              <input
                className="NewNPCDescription"
                placeholder="Species &amp; gender, Alignment......"
              ></input>
            </div>
          </section>
          <ReactQuill
            theme="snow"
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            modules={this.modules}
            placeholder="Character description..."
          />
          <NewNPCEditorToolbar />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // npcs: state.contentData.npcs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // sortContentHandler: () => dispatch(actions.sortContent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNPC);
