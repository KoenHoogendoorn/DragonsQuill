import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actionsIndex";

import classes from "./CardHeaderContainer.module.scss";

const CardHeaderContainer = (props) => {
  let clickedCard = null;

  const clickedCardHandler = (id) => {
    switch (id.substring(0, 2)) {
      case "np":
        clickedCard = props.npcs.find((npc) => npc.id === props.id);
        break;
      case "mo":
        clickedCard = props.monsters.find((monster) => monster.id === props.id);
        break;
      case "lo":
        clickedCard = props.locations.find(
          (location) => location.id === props.id
        );
        break;
      default:
        return;
    }

    if (clickedCard.open) {
      //togglecardhandler (closes and unhighlights item)
      props.toggleCardHandler(id);
      setTimeout(() => {
        //sort cards to make them go back in alfabetical order
        props.sortContentHandler();
      }, 175);
    } else {
      //togglecardhandler (opens card)
      props.toggleCardHandler(id);
    }
  };

  return (
    <section
      className={classes.CardHeaderContainer}
      onClick={() => clickedCardHandler(props.id)}
    >
      {props.children}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    locations: state.contentData.locations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id)),
    sortContentHandler: () => dispatch(actions.sortContent())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardHeaderContainer);
