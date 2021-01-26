import React from "react";
import { connect } from "react-redux";
import classes from "./EditorHeader.module.css";

import Button from "../../../../components/Button/Button";

const EditorHeader = (props) => {
  let editorHeader = null;

  props.chapters.forEach((chapter) => {
    if (chapter.id === props.activeChapter) {
      editorHeader = chapter.name;
    }
  });

  return (
    <div className={classes.EditorHeaderContainer}>
      <p className={classes.EditorHeader}>{editorHeader}</p>
      <Button size="small" priority="primary">
        <i className="far fa-save"></i>Save
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chapters: state.contentData.chapters,
    activeChapter: state.activeChapter.activeChapter
  };
};

export default connect(mapStateToProps)(EditorHeader);
