import React from "react";

import { connect } from "react-redux";

import classes from "../Card/CardBackground/CardBackground.module.css";

import CardBackground from "../Card/CardBackground/CardBackground";
import CardBody from "../Card/CardBody/CardBody";
import CardHeader from "../Card/CardHeader/CardHeader";
import CardToolbar from "../Card/CardToolbar/CardToolbar";
import Chevron from "../Card/Chevron/Chevron";

const NPC = (props) => {
  let chevronClass = classes.CardClosedIcon;

  let thisItem = null;

  switch (props.id.substring(0, 2)) {
    case "np":
      thisItem = props.npcs.find((npc) => npc.id === props.id);
      break;
    case "mo":
      thisItem = props.monsters.find((monster) => monster.id === props.id);
      break;
    default:
      return;
  }

  if (thisItem.open) {
    chevronClass = classes.CardOpenIcon;
  } else {
    chevronClass = classes.CardClosedIcon;
  }

  return (
    <CardBackground id={props.id}>
      <div id={props.id}>
        <CardHeader id={props.id}>
          <div>
            <h4>{props.name}</h4>
            <p className="CardSubtitle">{props.description}</p>
          </div>
          <Chevron class={chevronClass} />
        </CardHeader>
        <CardBody id={props.id}>
          <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
          <CardToolbar
          // onDelete={() => handleDelete()}
          // onEdit={() => handleEdit(thisItem)}
          />
        </CardBody>
      </div>
    </CardBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters
  };
};

export default connect(mapStateToProps)(NPC);
