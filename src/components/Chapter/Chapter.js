import React from "react";
import CardBackground from "../Card/CardBackground/CardBackground";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

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

// const mapStateToProps = (state) => {
//   return { activeChapter: state.activeChapter.activeChapter };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    activeChapterHandler: (chapter) => dispatch(actions.activeChapter(chapter))
  };
};

export default connect(null, mapDispatchToProps)(Chapter);
