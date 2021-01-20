import React from "react";

const EditorToolbar = (props) => {
  return (
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
};

export default EditorToolbar;
