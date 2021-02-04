import React from "react";

import Button from "../../../Button/Button";

import "./NPCEditorToolbar.scss";
import "../../../../shared/quillEditorOverall.scss";

const NPCEditorToolbar = (props) => {
  const NPCorMonsterToolbar = (
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
          <i className="far fa-trash-alt"></i>
          {props.editingExistingNPC ? "Cancel" : "Delete"}
        </Button>
        <Button size="small" priority="primary" clicked={props.onSave}>
          <i className="far fa-save"></i>Save
        </Button>
      </div>
    </div>
  );

  const ChapterToolbar = (
    <div className="toolbarNPCContainer">
      {/* <div id="toolbarNPC" className="toolbarNPC toolbar"></div> */}
      <div></div>
      <div className="ButtonsContainer ChapterButtonContainer">
        <Button size="small" priority="secondary" clicked={props.onDelete}>
          <i className="far fa-trash-alt"></i>
          Delete
        </Button>
        <Button size="small" priority="primary" clicked={props.onSave}>
          <i className="far fa-save"></i>Save
        </Button>
      </div>
    </div>
  );

  return props.hasEditor ? NPCorMonsterToolbar : ChapterToolbar;
};

export default NPCEditorToolbar;
