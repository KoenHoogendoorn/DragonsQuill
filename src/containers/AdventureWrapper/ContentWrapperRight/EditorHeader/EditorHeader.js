import React from "react";
import { connect } from "react-redux";
import classes from "./EditorHeader.module.scss";

import DownloadFileButton from "../../../../components/DownloadFileButton/DownloadFileButton";

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
      <DownloadFileButton />
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
