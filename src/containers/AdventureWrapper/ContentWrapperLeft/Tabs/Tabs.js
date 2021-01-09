import React from "react";
import classes from "./Tabs.module.css";

import Tab from "../../../../components/Tab/Tab";

const Tabs = (props) => (
  <div className={classes.Tabs}>
    <Tab>Chapters</Tab>
    <Tab>NPC's</Tab>
    <Tab>Locations</Tab>
    <Tab>Monsters</Tab>
  </div>
);

export default Tabs;
