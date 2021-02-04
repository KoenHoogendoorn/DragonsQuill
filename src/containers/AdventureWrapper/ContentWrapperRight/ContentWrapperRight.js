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

var icons = Quill.import("ui/icons");
icons["bold"] = '<i class="fas fa-bold" aria-hidden="true"></i>';
icons["italic"] = '<i class="fas fa-italic" aria-hidden="true"></i>';
icons["underline"] = '<i class="fas fa-underline" aria-hidden="true"></i>';
icons["link"] = '<i class="fas fa-link" aria-hidden="true"></i>';
icons["image"] = '<i class="far fa-image" aria-hidden="true"></i>';
icons["ul-list"] = '<i class="fas fa-list-ul" aria-hidden="true"></i>';
icons["ol-list"] = '<i class="fas fa-list-ol" aria-hidden="true"></i>';
icons["divider"] = '<i class="fas fa-grip-lines" aria-hidden="true"></i>';
icons["blockquote"] = '<i class="fas fa-quote-right" aria-hidden="true"></i>';
icons["h1-icon"] = "H1";
icons["h2-icon"] = "H2";

let BlockEmbed = Quill.import("blots/block/embed");

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
    super(props);
    this.state = {
      width: window.innerWidth
      // ch1: `<h1>${this.props.chapters[0].name}</h1>`
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    this.props.chapters.map((chapter) => this.setState({ [chapter.id]: "" }));

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
      this.props.highlightCardHandler(id);
      let clickedItem = null;

      const clickCardHandler = (clickedItem) => {
        if (clickedItem.open) {
          //togglecardhandler (closes card and unhighlights item)
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
        default:
          break;
      }
    };

    Quill.register(MentionBlot);
  }

  componentDidUpdate() {
    //set width to fixed item
    const wrapperRightBlock = document.getElementById("WrapperRightBlock");
    if (this.state.width <= 1480) {
      wrapperRightBlock.style.width = (this.state.width * 0.9) / 2 + "px";
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  modules = {
    toolbar: {
      container: ".toolbarChapter",
      handlers: {
        insertStar: insertStar,
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
    return (
      <div
        id="WrapperRightBlock"
        className={`${classes.ContentWrapper} ${classes.WrapperRightBlock}`}
      >
        <EditorHeader />
        <EditorToolbar />
        <div className="WrapperRightContent">
          <ReactQuill
            theme="snow"
            // onChange={(event) => this.handleChange(event)}
            onChange={(event) =>
              this.setState({ [this.props.activeChapterId]: event })
            }
            modules={this.modules}
            placeholder="Start writing here..."
            formats={this.formats}
            value={this.state[this.props.activeChapterId]}
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
    activeChapterId: state.activeChapterId.activeChapterId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeTabHandler: (contentType) => dispatch(actions.activeTab(contentType)),
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id)),
    highlightCardHandler: (id) => dispatch(actions.highlightCard(id)),
    sortContentHandler: (id) => dispatch(actions.sortContent(id)),
    closeCardsHandler: (newActiveTab) =>
      dispatch(actions.closeCards(newActiveTab))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapperRight);
