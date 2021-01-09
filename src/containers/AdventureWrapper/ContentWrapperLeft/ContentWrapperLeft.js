import React from "react";
import classes from "../AdventureWrapper.module.css";

import Tabs from "./Tabs/Tabs";
import SearchBar from "../../../components/SearchBar/SearchBar";

const ContentWrapperLeft = (props) => (
  <div className={`${classes.ContentWrapper} ${classes.WrapperLeft}`}>
    <h1>Adventure Title</h1>
    <Tabs />
    <hr className={classes.TabDivider} />
    <SearchBar />
    {/* Maybe change search into general inputbar */}
  </div>
);

export default ContentWrapperLeft;
