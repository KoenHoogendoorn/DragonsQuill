import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import CardBackground from "../Card/CardBackground/CardBackground";

const ChapterEditor = (props) => {
  return (
    <CardBackground>
      <input
        className="NPCEditorName"
        value={this.state.value}
        onChange={this.handleNameChange}
        placeholder="Character name..."
      ></input>
      {/* <h4>{props.name}</h4> */}
    </CardBackground>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeChapterIdHandler: (chapter) =>
      dispatch(actions.activeChapterId(chapter))
  };
};

export default connect(null, mapDispatchToProps)(ChapterEditor);
