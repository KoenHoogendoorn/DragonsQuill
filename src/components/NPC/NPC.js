import React, { useState } from "react";
import Card from "../Card/Card";

import classes from "../Card/Card.module.css";

const NPC = (props) => {
  const [cardOpen, setCardOpen] = useState(false);

  const ShowCardToggle = (id) => {
    const content = document.getElementById(id);

    if (content.style.maxHeight) {
      setCardOpen(false);
      content.style.maxHeight = null;
    } else {
      setCardOpen(true);
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };

  const chevronIcon = cardOpen ? (
    <i className={`fas fa-chevron-down ${classes.cardOpenIcon}`}></i>
  ) : (
    <i className={`fas fa-chevron-down ${classes.cardClosedIcon}`}></i>
  );

  return (
    // <Card clicked={ShowCardToggle} clickable={true}>
    <Card clicked={() => ShowCardToggle(props.npcId)} clickable={true}>
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
          onClick={() => ShowCardToggle(props.npcId)}
          className={classes.NPCContent}
        >
          <p onClick={() => ShowCardToggle(props.npcId)}>
            Young girl that helps them at the start. She is the daughter of the
            village elder and good friends with the tortles. Didn’t eat fish
            because her mother the village elder doesn’t like it.
          </p>
        </section>
      </div>
    </Card>
  );
};

export default NPC;

// const mapStateToProps = (state) => {
//   return {
//     cardOpen: state.card.cardOpen
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     ShowCardToggle: ({content.style.maxHeight}) => dispatch(actions.activeTab(contentType))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NPC);
