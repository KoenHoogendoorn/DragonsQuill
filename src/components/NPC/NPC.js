import React from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "../Card/Card.module.css";

import Card from "../Card/Card";
import Chevron from "../Card/Chevron/Chevron";

const NPC = (props) => {
  return (
    <Card clicked={() => props.toggleCardHandler(props.npcId)} clickable={true}>
      <div id={props.npcId}>
        <section className={classes.CardHeader}>
          <div>
            <h4>{props.name}</h4>
            <p className="CardSubtitle">{props.description}</p>
          </div>
          <Chevron />
        </section>
        <section
          // id={props.npcId}
          onClick={() => props.toggleCardHandler(props.npcId)}
          className={classes.NPCContent}
        >
          <p onClick={() => props.toggleCardHandler(props.npcId)}>
            Young girl that helps them at the start. She is the daughter of the
            village elder and good friends with the tortles. Didn’t eat fish
            because her mother the village elder doesn’t like it.
          </p>
        </section>
      </div>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id))
  };
};

export default connect(null, mapDispatchToProps)(NPC);
