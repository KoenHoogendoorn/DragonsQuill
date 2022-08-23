import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./LandingPage.module.scss";

import AdventureNameEditModal from "../../../components/AdventureNameEditModal/AdventureNameEditModal";
import Button from "../../../components/Button/Button";
import Logo from "../../../assets/logo/DragonsQuillLogo";
import UploadFileInput from "../../../components/UploadFileInput/UploadFileInput";

import Norlbelorg from "../../../assets/images/norlbelorg.png";
import BeachBattleMap from "../../../assets/images/BeachBattleMap.jpg";

import * as actions from "../../../store/actions/actionsIndex";

const LandingPage = (props) => {
  const [openAdventureNameModal, setOpenAdventureNameModal] = useState(false);
  const emptyContentData = [
    [
      {
        id: "ad0",
        value: ""
      }
    ],
    [
      {
        id: "ch0",
        value: "Chapters"
      }
    ],
    [
      {
        id: "np0",
        value: "NPC's",
        disabled: true
      }
    ],
    [
      {
        id: "mo0",
        value: "Monsters",
        disabled: true
      }
    ],
    [
      {
        id: "lo0",
        value: "Locations",
        disabled: true
      }
    ]
  ];

  const demoContentData = [
    [
      {
        id: "ad0",
        value: "Moonhaven's curse"
      }
    ],
    [
      {
        id: "ch0",
        value: "Chapters"
      },
      {
        id: "ch1",
        value: "The Beach",
        content: "",
        mentionIds: {
          npc: [],
          monster: [],
          location: []
        }
      },
      {
        id: "ch2",
        value: "Entering Moonhaven",
        content: "",
        mentionIds: {
          npc: [],
          monster: [],
          location: []
        }
      }
    ],
    [
      {
        id: "np0",
        value: "NPC's",
        disabled: true
      },
      {
        id: "np1",
        value: "Syka Twocreek",
        description: "Human female, Chaotic good",
        content:
          "Young girl that helps them at the start. She is the daughter of the village elder and good friends with the tortles. Didn’t eat fish because her mother the village elder doesn’t like it.",
        open: false
      },
      {
        id: "np2",
        value: "Lura Twocreek",
        description: "Human female, Neutral good",
        content:
          "Village elder, human woman in her 50s. She is concerned with the villagers. She doesn’t like fish so she isn’t affected by the addiction. Lived in the town since her childhood.",
        open: false
      },
      {
        id: "np3",
        value: "Kilki",
        description: "Tortle Male, Neutral good",
        content: "Retired old monk Tortle.",
        open: false
      },
      {
        id: "np4",
        value: "Falmo",
        description: "Tortle Male, Neutral Neutral",
        content:
          "A surfing dude Tortle with a floral headband. Loves to surf the waves on his belly and shield. Didn’t eat fishes because he doesn’t like to eat creatures. Wears a necklace with a bear tooth on it.",
        open: false
      }
    ],
    [
      {
        id: "mo0",
        value: "Monsters",
        disabled: true
      },
      {
        id: "mo1",
        value: "Giant Scorpion",
        description: "Large beast, unaligned",
        content:
          "Multiattack: The scorpion makes three attacks: two with its claws and one with its sting.",
        open: false
      },
      {
        id: "mo2",
        value: "Giant Crab",
        description: "Large beast, unaligned",
        content:
          "Multiattack: The scorpion makes two attacks: two with its claws.",
        open: false
      },
      {
        id: "mo3",
        value: "Bjorlbelorg",
        description: "Small humanoid, neutral evil",
        content: `Small creature with big dreams.. of stabbing you in the face. <img src="${Norlbelorg}">`,
        open: false
      }
    ],
    [
      {
        id: "lo0",
        value: "Locations",
        disabled: true
      },
      {
        id: "lo1",
        value: "Moonhaven",
        description: "Small town",
        content:
          "Moonhaven is a town in the south of Gurntaur. It’s not a well known town, and that’s a good thing because they wouldn’t last long against raiders. It’s a small fishing town that keeps to itself. ‘Give a man a fish, and he eats for a day.’. The people are simple and they like it like that. They are great friends with the Tortles living on and around the islands in the opening of Dina Anto. Every full moon (around every 30 days) they hold a friendly surfing match and feast together on the islands. Tortles are mainly hippies. Lately the humans from Moonhaven started to become more greedy. They are fishing more than they need. They even canceled the last moonparties! The humans are being influenced by new fish that they are suddenly catching. They haven’t seen the orange and purple fishes before, but they are delicious and they need to catch more and more. They are getting really fat and some people have eaten themselves to death. The Tortles aren’t eating the new fish because they don’t like new things.",
        open: false
      },
      {
        id: "lo2",
        value: "Gurntaur",
        description: "Region",
        content:
          "Gurntaur is a quiet place. It’s not rich in a lot of special recources so it has never really been contested. There’s farmland, lakes and wood, and that’s enough for the people living there. It’s connected in the north to Vallahir through Khro Burakrin and it’s disconnected from Wellhaven by the mystic marshes to the west. In the centre there are rolling hills that are inhabited by a tribe of hill giants.",
        open: false
      },
      {
        id: "lo3",
        value: "Beach",
        description: "Battlegrounds",
        content: `Inspiration for battlemap: <img src="${BeachBattleMap}">`,
        open: false
      }
    ]
  ];

  const handleNewAdventure = () => {
    // overwrite content with empty state
    props.overwriteAllContentHandler(emptyContentData);
    props.setShowDemoContent(false);
    // change activePage in adventurewrapper to newAdventureNamePage
    setOpenAdventureNameModal(true);
  };

  const handleDemoContent = () => {
    props.overwriteAllContentHandler(demoContentData);
    props.setActivePage();
    props.setShowDemoContent(true);
  };

  return (
    <div className={classes.LandingPage}>
      <AdventureNameEditModal
        modalTitle={"What is your adventure name?"}
        openAdventureNameModal={openAdventureNameModal}
        setOpenAdventureNameModal={() => setOpenAdventureNameModal(false)}
        addToSaveHandler={() => props.setActivePage()}
      />
      <div className={classes.ExistingStory}>
        <p>Existing story? Click here to upload adventure data (JSON file):</p>
        <UploadFileInput
          priority={"primary"}
          buttonText={"Upload file"}
          conclusiveFunction={() => props.setActivePage()}
        />
      </div>
      <Logo classes={classes.Logo} />
      <div className={classes.LandingPageText}>
        <h2>
          Dragon's Quill is an editor to help write and run D&#38;D adventures
          in a more structured way
        </h2>
        <p>
          This is very much a work in progress.{" "}
          <strong>There is no online backup of any content you write.</strong>{" "}
          You can save your content by downloading your adventure file. Upload
          it next time you want to continue working on your adventures.
        </p>
      </div>
      <div className={classes.ButtonWrapper}>
        <Button
          priority="primary"
          size="big"
          clicked={() => handleNewAdventure()}
        >
          New adventure
        </Button>
        <Button
          priority="secondary"
          size="big"
          clicked={() => handleDemoContent()}
        >
          Show demo
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    overwriteAllContentHandler: (newData) =>
      dispatch(actions.overwriteAllContent(newData))
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
