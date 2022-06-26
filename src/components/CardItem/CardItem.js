import React from "react";

import { connect } from "react-redux";

import * as actions from "../../store/actions/actionsIndex";

import cardBackgroundClasses from "../CardParts/CardBackground/CardBackground.module.scss";
import CardItemclasses from "./CardItem.module.scss";

import CardBackground from "../CardParts/CardBackground/CardBackground";
import CardBody from "../CardParts/CardBody/CardBody";
import CardHeaderContainer from "../CardParts/CardHeaderContainer/CardHeaderContainer";
import CardToolbar from "../CardParts/CardToolbar/CardToolbar";

const CardItem = (props) => {
  const classes = { ...cardBackgroundClasses, ...CardItemclasses };

  let chevronClass = classes.CardClosedIcon;
  let thisItem = null;

  switch (props.id.substring(0, 2)) {
    case "np":
      thisItem = props.npcs.find((npc) => npc.id === props.id);
      if (props.activeTab !== "NPCs") {
        thisItem.open = false;
      }
      break;
    case "mo":
      thisItem = props.monsters.find((monster) => monster.id === props.id);
      if (props.activeTab !== "Monsters") {
        thisItem.open = false;
      }
      break;
    case "lo":
      thisItem = props.locations.find((location) => location.id === props.id);
      if (props.activeTab !== "Locations") {
        thisItem.open = false;
      }
      break;
    default:
      break;
  }

  if (thisItem.open) {
    chevronClass = classes.CardOpenIcon;
  } else {
    chevronClass = classes.CardClosedIcon;
  }

  return (
    <CardBackground id={props.id}>
      <div id={props.id}>
        <CardHeaderContainer id={props.id}>
          <div className={classes.CardHeader}>
            <h4>{props.value}</h4>
            <p className={classes.CardSubtitle}>{props.description}</p>
          </div>
          <div className={classes.ChevronContainer}>
            <i className={`fas fa-chevron-down ${chevronClass}`}></i>
          </div>
        </CardHeaderContainer>
        <CardBody id={props.id}>
          <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
          <CardToolbar
            // onDelete={() => props.removeCardHandler(props.id)}
            onDelete={props.onDeleteClick}
            onEdit={props.onEditClick}
          />
        </CardBody>
      </div>
    </CardBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    locations: state.contentData.locations,
    activeTab: state.activeTab.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCardHandler: (id) => dispatch(actions.removeCard(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
