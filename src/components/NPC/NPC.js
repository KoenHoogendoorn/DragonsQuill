import React from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/actionsIndex";

import Card from "../Card/Card";
import classes from "../Card/Card.module.css";

const NPC = (props) => {
  //const [cardOpen, setCardOpen] = useState(false);

  // const ShowCardToggle = (id) => {
  //   const content = document.getElementById(id);

  //   if (content.style.maxHeight) {
  //     setCardOpen(false);
  //     content.style.maxHeight = null;
  //   } else {
  //     setCardOpen(true);
  //     content.style.maxHeight = content.scrollHeight + "px";
  //   }
  // };

  const chevronIcon = props.cardOpen ? (
    <i className={`fas fa-chevron-down ${classes.cardOpenIcon}`}></i>
  ) : (
    <i className={`fas fa-chevron-down ${classes.cardClosedIcon}`}></i>
  );

  return (
    <Card clicked={() => props.toggleCardHandler(props.npcId)} clickable={true}>
      <div>
        <section className={classes.CardHeader}>
          <div>
            <h4>{props.name}</h4>
            <p className="CardSubtitle">{props.description}</p>
          </div>
          {chevronIcon}
        </section>
        <section
          id={props.npcId}
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

const mapStateToProps = (state) => {
  return {
    cardOpen: state.card.cardOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCardHandler: (id) => dispatch(actions.toggleCard(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NPC);
