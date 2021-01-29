import React from "react";

import classes from "./CardToolbar.module.css";

import Button from "../../Button/Button";

const CardToolbar = (props) => {
  return (
    <div className={classes.CardToolbar}>
      <Button size="small" priority="tertiary">
        <i className="far fa-trash-alt"></i>
        Delete
      </Button>
      <Button size="small" priority="tertiary">
        <i className="far fa-edit"></i>
        Edit
      </Button>
    </div>
  );
};

export default CardToolbar;
