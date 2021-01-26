import React from "react";
// import "../../ContentWrapperRight.css";
import "../../../../shared/quillEditorOverall.css";

const EditorToolbar = (props) => {
  return (
    <div id="toolbar" className="toolbarChapter toolbar">
      {/* <select
        className="ql-header"
        defaultValue={""}
        onChange={(e) => e.persist()}
      >
        <option value="1"></option>
        <option value="2"></option>
        <option value=""></option>
      </select> */}
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
