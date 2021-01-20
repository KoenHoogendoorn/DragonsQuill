import React from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import classes from "../Card/Card.module.css";

import Card from "../Card/Card";
import Chevron from "../Card/Chevron/Chevron";

const NPC = (props) => {
  return (
    <Card clicked={() => props.toggleCardHandler(props.id)}>
      <div id={props.id}>
        <section className={classes.CardHeader}>
          <div>
            <h4>{props.name}</h4>
            <p className="CardSubtitle">{props.description}</p>
          </div>
          <Chevron />
        </section>
        <section
          // id={props.id}
          onClick={() => props.toggleCardHandler(props.id)}
          className={classes.CardContent}
        >
          <p onClick={() => props.toggleCardHandler(props.id)}>
            {props.content}
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
