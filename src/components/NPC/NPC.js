import React from "react";

import { connect } from "react-redux";

import * as actions from "../../store/actions/actionsIndex";

import cardBackgroundClasses from "../Card/CardBackground/CardBackground.module.scss";
import NPCclasses from "./NPC.module.scss";

import CardBackground from "../Card/CardBackground/CardBackground";
import CardBody from "../Card/CardBody/CardBody";
import CardHeaderContainer from "../Card/CardHeaderContainer/CardHeaderContainer";
import CardToolbar from "../Card/CardToolbar/CardToolbar";
import Chevron from "../Card/Chevron/Chevron";

const NPC = (props) => {
  const classes = { ...cardBackgroundClasses, ...NPCclasses };

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
          <Chevron class={chevronClass} />
        </CardHeaderContainer>
        <CardBody id={props.id}>
          <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
          <CardToolbar
            onDelete={() => props.removeNPCHandler(props.id)}
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
    activeTab: state.activeTab.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeNPCHandler: (id) => dispatch(actions.removeNPC(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NPC);
