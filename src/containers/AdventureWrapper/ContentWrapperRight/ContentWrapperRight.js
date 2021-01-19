import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import "../../../blots/dndmention";

import classes from "../AdventureWrapper.module.css";
import "./ContentWrapperRight.css";

import * as actions from "../../../store/actions/actionsIndex";

let BlockEmbed = Quill.import("blots/block/embed");
// ---------

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

Quill.register(DividerBlot);

// ---------

/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

function addDivider() {
  let range = this.quill.getSelection(true);
  this.quill.insertText(range.index, "\n", Quill.sources.USER);
  this.quill.insertEmbed(range.index + 1, "divider", true, Quill.sources.USER);
  this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
}

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option value></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-blockquote"></button>
    <button className="ql-link"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option value></option>
    </select>
    <button className="ql-insertStar">★</button>
    <button className="ql-addDivider">--</button>
  </div>
);

/*
 * Editor component with custom toolbar and content containers
 */

// ------
// quill.getModule('toolbar').addHandler('image', () => {
//   importImage(quill);
// });
// this.quill.getModule("mention");

//import Mention from "quill-mention";

// Mention.insertItem = (data, programmaticInsert) => {
//   alert("InsertItem");
//   const render = data;
//   if (render === null) {
//     return;
//   }
//   if (!this.options.showDenotationChar) {
//     render.denotationChar = "";
//   }

//   var insertAtPos;

//   if (!programmaticInsert) {
//     insertAtPos = this.mentionCharPos;
//     this.quill.deleteText(
//       this.mentionCharPos,
//       this.cursorPos - this.mentionCharPos,
//       Quill.sources.USER
//     );
//   } else {
//     insertAtPos = this.cursorPos;
//   }
//   this.quill.insertEmbed(
//     insertAtPos,
//     this.options.blotName,
//     render,
//     Quill.sources.USER
//   );
//   if (this.options.spaceAfterInsert) {
//     this.quill.insertText(insertAtPos + 1, " ", Quill.sources.USER);
//     // setSelection here sets cursor position
//     this.quill.setSelection(insertAtPos + 2, Quill.sources.USER);
//   } else {
//     this.quill.setSelection(insertAtPos + 1, Quill.sources.USER);
//   }
//   this.hideMentionList();
// };
// ------

class ContentWrapperRight extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { editorHtml: "" };
  //   // this.modules.mention.onSelect = this.modules.mention.onSelect.bind(this);
  //   // this.handleChange = this.handleChange.bind(this);
  // }
  state = {
    editorHtml: ""
  };

  handleChange = (html) => {
    this.setState({ editorHtml: html });
  };

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertStar: insertStar,
        addDivider: addDivider
      }
    },
    mention: {
      onSelect: (item, insertItem) => {
        //this.props.toggleCardHandler(item.id); //opens card on mentioncreation
        const itemAndThis = [item, this];
        insertItem(itemAndThis);
      },
      blotName: "dndmention",
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      showDenotationChar: false,
      dataAttributes: ["id", "value", "denotationChar", "target"],
      source: (searchTerm, renderList, mentionChar) => {
        let values = this.props.npcs.concat(this.props.monsters);

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
        return `
          <div class="cql-list-item-inner">
          ${item.value}
          </div>`;
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
    return (
      <div className={`${classes.ContentWrapper} ${classes.WrapperRightBlock}`}>
        <CustomToolbar />
        <div className={classes.WrapperRightContent}>
          <ReactQuill
            theme="snow"
            onChange={this.handleChange}
            modules={this.modules}
            placeholder="Start writing here..."
            formats={this.formats}
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
    chapters: state.contentData.chapters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeTabHandler: (contentType) => dispatch(actions.activeTab(contentType)),
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapperRight);
