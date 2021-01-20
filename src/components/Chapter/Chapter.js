import React from "react";
import Card from "../Card/Card";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

const Chapter = (props) => {
  return (
    <Card id={props.id} clicked={() => props.activeChapterHandler(props.id)}>
      <h4>{props.name}</h4>
    </Card>
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
