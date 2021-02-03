import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import CardBackground from "../Card/CardBackground/CardBackground";

const Chapter = (props) => {
  return (
    <CardBackground
      id={props.id}
      clicked={() => props.activeChapterHandler(props.id)}
    >
      <h4>{props.name}</h4>
    </CardBackground>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeChapterHandler: (chapter) => dispatch(actions.activeChapter(chapter))
  };
};

export default connect(null, mapDispatchToProps)(Chapter);
