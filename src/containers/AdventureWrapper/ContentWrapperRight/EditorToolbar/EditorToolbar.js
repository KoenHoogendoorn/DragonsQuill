import React from "react";
import "../../../../shared/quillEditorOverall.scss";

const EditorToolbar = (props) => {
  return (
    <div id="toolbar" className="toolbarChapter toolbar">
      <button id="h1-button" className="ql-header" value="1"></button>
      <button id="h2-button" className="ql-header" value="2"></button>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-list ql-ul-list" value="bullet"></button>
      <button className="ql-list ql-ol-list" value="ordered"></button>
      <button className="ql-divider"></button>
    </div>
  );
};

export default EditorToolbar;
