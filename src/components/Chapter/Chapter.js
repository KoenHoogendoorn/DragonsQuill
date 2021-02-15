import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "./Chapter.module.scss";

import CardBackground from "../Card/CardBackground/CardBackground";
import MentionToken from "./ChapterMentionTokens/MentionToken";

const Chapter = (props) => {
  const MentionTokens = (contentType) => {
    return props.chapters.map((chapter) => {
      if (props.id === chapter.id) {
        const currentMentionIdArray = chapter.mentionIds[contentType];
        const distinctMentionIds = [...new Set(currentMentionIdArray)];
        return distinctMentionIds.map((mentionId) => {
          return (
            <MentionToken key={mentionId} id={mentionId} type={contentType} />
          );
        });
      } else {
        return null;
      }
    });
  };

  return (
    <CardBackground
      id={props.id}
      clicked={() => props.activeChapterIdHandler(props.id)}
    >
      <h4>{props.value}</h4>
      <div className={classes.MentionTokenBar}>
        <div className={classes.MentionTokenContainer}>
          {MentionTokens("npc")}
        </div>
        <div className={classes.MentionTokenContainer}>
          {MentionTokens("monster")}
        </div>
        <div className={classes.MentionTokenContainer}>
          {MentionTokens("location")}
        </div>
      </div>
    </CardBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    chapters: state.contentData.chapters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeChapterIdHandler: (chapter) =>
      dispatch(actions.activeChapterId(chapter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
