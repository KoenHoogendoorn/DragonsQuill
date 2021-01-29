import React from "react";

import { connect } from "react-redux";

import classes from "../Card/Card.module.css";

import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader/CardHeader";
import CardBody from "../Card/CardBody/CardBody";
import CardToolbar from "../Card/CardToolbar/CardToolbar";
import Chevron from "../Card/Chevron/Chevron";

const NPC = (props) => {
  let chevronClass = classes.CardClosedIcon;

  const clickedNPC = props.npcs.find((npc) => npc.id === props.id);

  if (clickedNPC.open) {
    chevronClass = classes.CardOpenIcon;
  } else {
    chevronClass = classes.CardClosedIcon;
  }

  // useEffect(() => {
  //   props.npcs.forEach(
  //     (npc) => {
  //       if (npc.open || clickedNPC.open) {
  //         chevronClass = classes.CardOpenIcon;
  //       } else {
  //         chevronClass = classes.CardClosedIcon;
  //       }
  //     },
  //     [props.npcs]
  //   );
  // });

  return (
    <Card id={props.id}>
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
          <CardToolbar />
        </CardBody>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    npcs: state.contentData.npcs
  };
};

export default connect(mapStateToProps)(NPC);
