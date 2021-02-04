import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import CardBackground from "../Card/CardBackground/CardBackground";

const Chapter = (props) => {
  return (
    <CardBackground
      id={props.id}
      clicked={() => props.activeChapterIdHandler(props.id)}
    >
      <h4>{props.value}</h4>
    </CardBackground>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeChapterIdHandler: (chapter) =>
      dispatch(actions.activeChapterId(chapter))
  };
};

export default connect(null, mapDispatchToProps)(Chapter);
