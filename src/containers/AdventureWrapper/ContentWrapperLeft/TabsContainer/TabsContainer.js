import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/actionsIndex";

import Tab from "../../../../components/Tab/Tab";

const TabsContainer = (props) => {
  const clickTabHandler = (type) => {
    props.clearSearch();
    props.cancelEditingCard();
    props.closeCardsHandler(type);
    props.activeTabHandler(type);
  };

  return (
    <section className={props.tabsContainerClasses}>
      <Tab contentType={"Chapters"} clicked={() => clickTabHandler("Chapters")}>
        <i className="fas fa-bookmark"></i>
        Chapters
      </Tab>
      <Tab contentType={"NPCs"} clicked={() => clickTabHandler("NPCs")}>
        <i className="fas fa-user"></i>
        NPC's
      </Tab>
      <Tab contentType={"Monsters"} clicked={() => clickTabHandler("Monsters")}>
        <i className="fas fa-dragon"></i>
        Monsters
      </Tab>
      <Tab
        contentType={"Locations"}
        clicked={() => clickTabHandler("Locations")}
      >
        <i className="fas fa-map-marked-alt"></i>
        Locations
      </Tab>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeTabHandler: (contentType) => dispatch(actions.activeTab(contentType)),
    closeCardsHandler: (newActiveTab) =>
      dispatch(actions.closeCards(newActiveTab))
  };
};

export default connect(null, mapDispatchToProps)(TabsContainer);
