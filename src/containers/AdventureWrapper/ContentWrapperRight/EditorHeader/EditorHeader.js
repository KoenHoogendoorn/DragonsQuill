import React from "react";
import { connect } from "react-redux";
import classes from "./EditorHeader.module.scss";

import Button from "../../../../components/Button/Button";

const EditorHeader = (props) => {
  let editorHeader = null;

  props.chapters.forEach((chapter) => {
    if (chapter.id === props.activeChapterId) {
      editorHeader = chapter.value;
    }
  });

  return (
    <div className={classes.EditorHeaderContainer}>
      <p className={classes.EditorHeader}>{editorHeader}</p>
      <Button size="small" priority="primary" iconPlacement="left">
        <i className="far fa-save"></i>Save
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chapters: state.contentData.chapters,
    activeChapterId: state.activeChapterId.activeChapterId
  };
};

export default connect(mapStateToProps)(EditorHeader);
