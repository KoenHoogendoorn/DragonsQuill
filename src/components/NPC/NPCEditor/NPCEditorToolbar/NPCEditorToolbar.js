import React from "react";

import Button from "../../../Button/Button";

import "./NPCEditorToolbar.css";
import "../../../../shared/quillEditorOverall.css";

const NPCEditorToolbar = (props) => (
  <div className="toolbarNPCContainer">
    <div id="toolbarNPC" className="toolbarNPC toolbar">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-list ql-ul-list" value="bullet"></button>
      <button className="ql-list ql-ol-list" value="ordered"></button>
    </div>
    <div className="ButtonsContainer">
      <Button size="small" priority="secondary" clicked={props.onDelete}>
        <i className="far fa-trash-alt"></i>Delete
      </Button>
      <Button size="small" priority="primary" clicked={props.onSave}>
        <i className="far fa-save"></i>Save
      </Button>
    </div>
  </div>
);

export default NPCEditorToolbar;
