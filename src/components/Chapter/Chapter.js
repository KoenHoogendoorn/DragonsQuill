import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "./Chapter.module.scss";

import CardBackground from "../CardParts/CardBackground/CardBackground";
import Dropdown from "../Dropdown/Dropdown";
import MentionToken from "./ChapterMentionTokens/MentionToken";

const Chapter = (props) => {
  const mentionTokensMapper = (contentType) => {
    //go through chapters
    return props.chapters.map((chapter) => {
      //check subarray (npc, monster, location)
      if (props.id === chapter.id) {
        const currentMentionIdArray = chapter.mentionIds[contentType];
        const distinctMentionIds = [...new Set(currentMentionIdArray)];
        //store mention IDs in a set and go through them
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
      <div className={classes.CardHeaderContainer}>
        <h4>{props.value}</h4>
        <Dropdown clickableIconName={"fas fa-ellipsis-h"}>
          <button className={classes.DropdownItem} onClick={props.onEditClick}>
            <i className="far fa-edit"></i>Edit
          </button>
          <button
            className={classes.DropdownItem}
            onClick={props.onDeleteClick}
          >
            <i className="far fa-trash-alt"></i>Delete
          </button>
        </Dropdown>
      </div>
      <div className={classes.MentionTokenBar}>
        <div className={classes.MentionTokenContainer}>
          {mentionTokensMapper("npc")}
        </div>
        <div className={classes.MentionTokenContainer}>
          {mentionTokensMapper("monster")}
        </div>
        <div className={classes.MentionTokenContainer}>
          {mentionTokensMapper("location")}
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
