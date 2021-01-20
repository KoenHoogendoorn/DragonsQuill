import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";

import "../../../blots/dndmention";
import EditorToolbar from "./EditorToolbar/EditorToolbar";
import EditorHeader from "./EditorHeader/EditorHeader";

import classes from "../AdventureWrapper.module.css";
import "./ContentWrapperRight.css";

import * as actions from "../../../store/actions/actionsIndex";

let BlockEmbed = Quill.import("blots/block/embed");
// ---------

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

Quill.register(DividerBlot);

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
  state = {
    ch1Html: `<h1>${this.props.chapters[0].name}</h1>`,
    ch2Html: `<h1>${this.props.chapters[1].name}</h1>`
  };

  handleChange = (html) => {
    switch (this.props.activeChapter) {
      case "ch1":
        this.setState({ ch1Html: html });
        break;
      case "ch2":
        this.setState({ ch2Html: html });
        break;
      default:
        break;
    }
  };

  handleValue = () => {
    switch (this.props.activeChapter) {
      case "ch1":
        return this.state.ch1Html;
      case "ch2":
        return this.state.ch2Html;
      default:
        return this.state.ch1Html;
    }
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

  scrollingContainer = ".ql-editor";

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
        <EditorHeader />
        <EditorToolbar />
        <div className={`${classes.WrapperRightContent} .scroll-container`}>
          <ReactQuill
            theme="snow"
            onChange={(event) => this.handleChange(event)}
            modules={this.modules}
            placeholder="Start writing here..."
            formats={this.formats}
            value={this.handleValue()}
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
    activeChapter: state.activeChapter.activeChapter
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
