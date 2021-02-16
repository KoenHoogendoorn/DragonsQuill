import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "./Chapter.module.scss";

import CardBackground from "../CardParts/CardBackground/CardBackground";
import MentionToken from "./ChapterMentionTokens/MentionToken";
import ClickableIcon from "../ClickableIcon/ClickableIcon";

const Chapter = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

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

  let dropdownContentClasses = showDropdown
    ? `${classes.DropdownContent} ${classes.Show}`
    : `${classes.DropdownContent}`;

  return (
    <CardBackground
      id={props.id}
      clicked={() => props.activeChapterIdHandler(props.id)}
    >
      <div className={classes.CardHeaderContainer}>
        <h4>{props.value}</h4>
        <ClickableIcon
          class={`${classes.Dropdown}`}
          clicked={() => setShowDropdown(!showDropdown)}
          showDropdown={showDropdown}
        >
          <i className="fas fa-ellipsis-h"></i>
          <div className={dropdownContentClasses}>
            <button
              className={classes.DropdownItem}
              onClick={props.onEditClick}
            >
              <i className="far fa-edit"></i>Edit
            </button>
            <button
              className={classes.DropdownItem}
              onClick={props.onDeleteClick}
            >
              <i className="far fa-trash-alt"></i>Delete
            </button>
          </div>
        </ClickableIcon>
      </div>
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
