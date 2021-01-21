import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";

// import "../../../blots/dndmention";
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

class ContentWrapperRight extends Component {
  constructor(props) {
    // this.formats = formats;
    // this.props = React.createRef();
    super(props);
    this.state = {
      ch1Html: `<h1>${this.props.chapters[0].name}</h1>`,
      ch2Html: `<h1>${this.props.chapters[1].name}</h1>`
    };
  }

  componentDidMount() {
    const Embed = Quill.import("blots/embed");

    class MentionBlot extends Embed {
      static create = (data) => {
        const node = super.create();
        // let data = dataAndThis;
        // let This = null;
        // if (Array.isArray(dataAndThis)) {
        //   data = dataAndThis[0];
        //   This = dataAndThis[1];
        // }
        const denotationChar = document.createElement("span");
        denotationChar.className = "ql-mention-denotation-char";
        denotationChar.innerHTML = data.denotationChar;
        // node.appendChild(denotationChar);
        node.innerHTML += data.value;
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
      switch (id.substring(0, 2)) {
        case "np":
          this.props.activeTabHandler("NPCs");
          break;
        case "mo":
          this.props.activeTabHandler("Monsters");
          break;
        default:
          break;
      }
      this.props.toggleCardHandler(id);
    };

    Quill.register(MentionBlot);
  }

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
      blotName: "dndmention",
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
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
      },
      onSelect: (item, insertItem) => {
        //this.props.toggleCardHandler(item.id); //opens card on mentioncreation
        // const itemAndThis = [item, this];
        insertItem(item);
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
        <EditorHeader />
        <EditorToolbar />
        <div className={classes.WrapperRightContent}>
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
