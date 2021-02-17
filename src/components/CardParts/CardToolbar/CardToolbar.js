import React from "react";

import classes from "./CardToolbar.module.scss";

import Button from "../../Button/Button";

const CardToolbar = (props) => {
  return (
    <div className={classes.CardToolbar}>
      <Button
        size="small"
        priority="tertiary"
        iconPlacement="left"
        clicked={props.onDelete}
      >
        <i className="far fa-trash-alt"></i>
        Delete
      </Button>
      <Button
        size="small"
        priority="tertiary"
        iconPlacement="left"
        clicked={props.onEdit}
      >
        <i className="far fa-edit"></i>
        Edit
      </Button>
    </div>
  );
};

export default CardToolbar;
