import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";

import "./Editor.css";
/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
// const CustomButton = () => <span className="octicon octicon-star" />;

/*
 * Event handler to be attached using Quill toolbar module
 * http://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
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
  </div>
);

const atValues = [
  { id: 1, value: "Aart van Empel", link: "https://github.com/aartvanempel"},
  { id: 2, value: "Patrik Sjölin" }
];


const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2"},
  { id: 4, value: "Patrik Sjölin 2" }
];

/* 
 * Editor component with custom toolbar and content containers
 */

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertStar: insertStar
      }
    },
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      showDenotationChar: false,
      dataAttributes: ['id', 'value', 'denotationChar', 'link', 'target','disabled' ],
      source: function (searchTerm, renderList, mentionChar) {
        let values;

        if (mentionChar === "@") {
          values = atValues;
        } else {
          values = hashValues;
        }

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
    "mention"
  ];

  render() {
    return (
      <div className={"EditorContainer"}>
        <CustomToolbar />
        <ReactQuill
          theme="snow"
          onChange={this.handleChange}
          modules={this.modules}
          placeholder={this.props.placeholder}
          formats={this.formats}
        />
      </div>
    );
  }
}

export default Editor;