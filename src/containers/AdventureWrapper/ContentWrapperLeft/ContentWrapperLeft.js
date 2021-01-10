import React from "react";
import classes1 from "../AdventureWrapper.module.css";
import classes2 from "./ContentWrapperLeft.module.css";

import Tabs from "./Tabs/Tabs";
import Inputbar from "../../../components/Inputbar/Inputbar";
import Button from "../../../components/Button/Button";
import NPC from "../../../components/NPC/NPC";

const classes = { ...classes1, ...classes2 };

const ContentWrapperLeft = (props) => (
  <div className={`${classes.ContentWrapper} ${classes.WrapperLeft}`}>
    <h1>Adventure Title</h1>
    <Tabs />
    <hr className={classes.TabDivider} />
    <section className={classes.CardToolbar}>
      <Inputbar type="search" placeholder="Search for anything..." />
      <Button>Add NPC{props.contentType}</Button>
    </section>
    <section className={classes.CardsContainer}>
      <NPC />
      <NPC />
      <NPC />
      <NPC />
      <NPC />
    </section>
  </div>
);

export default ContentWrapperLeft;
