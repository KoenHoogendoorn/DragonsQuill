import React from "react";

import Button from "../../../Button/Button";

import "./CardItemEditorToolbar.scss";
import "../../../../shared/quillEditorOverall.scss";

const CardItemEditorToolbar = (props) => {
  const NPCorMonsterToolbar = (
    <div className="ToolbarCardItemContainer">
      <div id="toolbarCardItem" className="toolbarCardItem toolbar">
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
          {props.editingExistingCardItem ? "Cancel" : "Delete"}
        </Button>
        <Button size="small" priority="primary" clicked={props.onSave}>
          <i className="far fa-save"></i>Save
        </Button>
      </div>
    </div>
  );

  const ChapterToolbar = (
    <div className="ToolbarCardItemContainer">
      {/* <div id="CardItem" className="CardItem toolbar"></div> */}
      <div></div>
      <div className="ButtonsContainer ChapterButtonContainer">
        <Button size="small" priority="secondary" clicked={props.onDelete}>
          <i className="far fa-trash-alt"></i>
          {props.editingExistingCardItem ? "Cancel" : "Delete"}
        </Button>
        <Button size="small" priority="primary" clicked={props.onSave}>
          <i className="far fa-save"></i>Save
        </Button>
      </div>
    </div>
  );

  return props.hasEditor ? NPCorMonsterToolbar : ChapterToolbar;
};

export default CardItemEditorToolbar;
