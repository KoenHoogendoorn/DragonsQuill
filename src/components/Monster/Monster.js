import React from "react";

import { connect } from "react-redux";

import classes from "../Card/Card.module.css";

import Card from "../Card/Card";
import CardToolbar from "../Card/CardToolbar/CardToolbar";
import Chevron from "../Card/Chevron/Chevron";

const Monster = (props) => {
  let chevronClass = classes.CardClosedIcon;

  const clickedMonster = props.monsters.find(
    (monster) => monster.id === props.id
  );

  if (clickedMonster.open) {
    chevronClass = classes.CardOpenIcon;
  } else {
    chevronClass = classes.CardClosedIcon;
  }
  return (
    <Card id={props.id}>
      <div id={props.id}>
        <section className={classes.CardHeader}>
          <div>
            <h4>{props.name}</h4>
            <p className="CardSubtitle">{props.description}</p>
          </div>
          <Chevron class={chevronClass} />
        </section>
        <section className={classes.HiddenCardContent}>
          <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
          <CardToolbar />
        </section>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    monsters: state.contentData.monsters
  };
};

export default connect(mapStateToProps)(Monster);
