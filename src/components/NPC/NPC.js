import React from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "../Card/Card.module.css";

import Card from "../Card/Card";
import Chevron from "../Card/Chevron/Chevron";

const NPC = (props) => {
  let chevronClass = classes.CardClosedIcon;

  const clickedNPC = props.npcs.find((npc) => npc.id === props.id);

  if (clickedNPC.open) {
    chevronClass = classes.CardOpenIcon;
  } else {
    chevronClass = classes.CardClosedIcon;
  }

  const clickCardHandler = (id) => {
    if (clickedNPC.open) {
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
    <Card clicked={() => clickCardHandler(props.id)}>
      <div id={props.id}>
        <section className={classes.CardHeader}>
          <div>
            <h4>{props.name}</h4>
            <p className="CardSubtitle">{props.description}</p>
          </div>
          <Chevron class={chevronClass} />
        </section>
        <section
          onClick={() => clickCardHandler(props.id)}
          className={classes.CardContent}
        >
          <div
            onClick={() => clickCardHandler(props.id)}
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></div>
        </section>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id)),
    sortContentHandler: () => dispatch(actions.sortContent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NPC);
