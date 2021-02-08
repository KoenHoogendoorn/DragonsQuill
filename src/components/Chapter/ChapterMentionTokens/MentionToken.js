import React from "react";
import { connect } from "react-redux";
import "./ChapterMentionTokens.scss";

const MentionToken = (props) => {
  let classType = "fas fa-user MentionCircle";
  let currentMention = null;
  switch (props.type) {
    case "npc":
      classType = "fas fa-user MentionCircle NPCMentionToken";
      currentMention = props.npcs.find((npc) => npc.id === props.id);
      break;
    case "monster":
      classType = "fas fa-dragon MentionCircle MonsterMentionToken";
      currentMention = props.monsters.find(
        (monster) => monster.id === props.id
      );
      break;
    case "location":
      classType = "fas fa-map-marked-alt MentionCircle LocationMentionToken";
      currentMention = props.locations.find(
        (location) => location.id === props.id
      );
      break;
    default:
      break;
  }

  return (
    <div id={props.id} className={classType}>
      <i></i>
      <span className="ToolTip">
        {currentMention ? currentMention.value : null}
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chapters: state.contentData.chapters,
    npcs: state.contentData.npcs,
    monsters: state.contentData.monsters,
    locations: state.contentData.locations
  };
};

export default connect(mapStateToProps)(MentionToken);
