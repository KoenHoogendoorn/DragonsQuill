import React from "react";
import { connect } from "react-redux";

import classes from "./CardBody.module.scss";

const CardBody = (props) => {
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

  let CardBodyClasses = classes.CardBody;

  if (thisItem.open) {
    CardBodyClasses = `${classes.CardBody} ${classes.CardBodyOpen}`;
  } else {
    CardBodyClasses = classes.CardBody;
  }

  return (
    <section
      // style={{ maxHeight: CardScrollHeight }}
      className={CardBodyClasses}
    >
      {props.children}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters
  };
};

export default connect(mapStateToProps)(CardBody);
