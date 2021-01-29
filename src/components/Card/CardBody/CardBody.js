import React from "react";
import { connect } from "react-redux";

import classes from "./CardBody.module.css";

const CardBody = (props) => {
  const thisItem = props.npcs.find((item) => item.id === props.id);
  // const selectedItemHtml = document.getElementById(thisItem.id);
  // const content = selectedItemHtml.lastChild; //content = CardBody component
  let CardBodyClasses = classes.CardBody;
  // let CardScrollHeight = null;

  if (thisItem.open) {
    CardBodyClasses = `${classes.CardBody} ${classes.CardBodyOpen}`;
    // CardScrollHeight = `${content.scrollHeight + 17}px`;
  } else {
    CardBodyClasses = classes.CardBody;
    // CardScrollHeight = null;
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
    npcs: state.contentData.npcs
  };
};

export default connect(mapStateToProps)(CardBody);
