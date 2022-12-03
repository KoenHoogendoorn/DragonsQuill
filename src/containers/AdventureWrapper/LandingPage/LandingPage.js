import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import classes from "./LandingPage.module.scss";

import AdventureNameEditModal from "../../../components/AdventureNameEditModal/AdventureNameEditModal";
import Button from "../../../components/Button/Button";
import Logo from "../../../assets/logo/DragonsQuillLogo";
import SecondaryLink from "../../../components/SecondaryLink/SecondaryLink";
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
        content:
          "<h1><span style='color: rgb(0, 0, 0);'>The beach</span></h1><blockquote><em style='color: rgb(0, 0, 0);'>You continue south alongside the <span class='dndmention' data-index='0' data-denotation-char='' data-id='lo2' data-value='Gurntaur'>&#65279;<span contenteditable='false'>Gurntaur</span>&#65279;</span> hills on your left hand and green fields on your right. Spring is still in the air and you can smell the flowers around you. After three more relatively quiet days, the sun is shining bright on your heads when you come upon a dense forest. You try to stay on the same path as you were going but it gets harder as you get deeper into the forest. After walking for a couple of hours, you can hear the sea in the distance. But you also hear something else, a childrens scream for help.</em></blockquote><p><span style='color: rgb(0, 0, 0);'>In the forest, a tribe of </span><span class='dndmention' data-index='0' data-denotation-char='' data-id='mo3' data-value='Bjorlbelorg'>&#65279;<span contenteditable='false'>Bjorlbelorg</span>&#65279;</span> is living relatively peacefully. They are protective of their village and trade with pine cones.</p><p><br></p><p><strong style='color: rgb(0, 0, 0);'>After following the sound of the scream</strong></p><blockquote><em style='color: rgb(0, 0, 0);''>As you crest a small rise topped with tall grass, you see the <span class='dndmention' data-index='0' data-denotation-char='' data-id='lo3' data-value='Beach'>&#65279;<span contenteditable='false'>Beach</span>&#65279;</span> below you. The <span class='dndmention' data-index='0' data-denotation-char='' data-id='lo3' data-value='Beach'>&#65279;<span contenteditable='false'>Beach</span>&#65279;</span> is about 100 feet of sand with large rocks jutting up out of the sand. On one of the rocks in the middle of the beach is a child of about 10 years old screaming for help. In front of her, You see a Turtle like humanoid protecting her with a staff. Around the rock are several crab-looking monsters, each one easily the size of a mastiff. Seaweed and coral is sticking to them as if&nbsp; they haven’t seen the surface in a while (perception check for stingers). They have surrounded the rock and are snapping their claws up at their trapped prey.&nbsp;</em></blockquote><p><span class='dndmention' data-index='2' data-denotation-char='' data-id='np3' data-value='Kilki'>&#65279;<span contenteditable='false'>Kilki</span>&#65279;</span> is training <span class='dndmention' data-index='0' data-denotation-char='' data-id='np1' data-value='Syka Twocreek'>&#65279;<span contenteditable='false'>Syka Twocreek</span>&#65279;</span> secretly on the beach. They got surprised by 2 <span class='dndmention' data-index='0' data-denotation-char='' data-id='mo2' data-value='Giant Crab'>&#65279;<span contenteditable='false'>Giant Crab</span>&#65279;</span> and 1 <span class='dndmention' data-index='1' data-denotation-char='' data-id='mo1' data-value='Giant Scorpion'>&#65279;<span contenteditable='false'>Giant Scorpion</span>&#65279;</span>. If the party saves them, both will be very gratefull. <span class='dndmention' data-index='1' data-denotation-char='' data-id='np1' data-value='Syka Twocreek'>&#65279;<span contenteditable='false'>Syka Twocreek</span>&#65279;</span> is very enthousiastic and won't stop talking about all the cool things the the PC's did during the fight. </p>",
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

  useEffect(() => {
    props.setShowDemoContent(false); // not sure if this needs to be here, or if it was all just because democontent was not added correctly
  }, []);

  const handleNewAdventure = () => {
    // overwrite content with empty state
    props.overwriteAllContentHandler(emptyContentData);
    // change activePage in adventurewrapper to newAdventureNamePage
    setOpenAdventureNameModal(true);
  };

  const handleDemoContent = () => {
    props.overwriteAllContentHandler(demoContentData);
    props.setShowDemoContent(true);
    props.setActivePage();
  };

  const handleLoadedContent = () => {
    props.setActivePage();
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
          conclusiveFunction={() => handleLoadedContent()}
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
          <span>
            There is no (automatic) online backup of any content you write.
          </span>{" "}
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
      <p className={classes.PortfolioLink}>
        Read more about me and other D&D related apps I made{" "}
        <SecondaryLink url="https://dddmkoen.com/">here</SecondaryLink>
      </p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    overwriteAllContentHandler: (newData) =>
      dispatch(actions.overwriteAllContent(newData)),
    removeCardHandler: (id) => dispatch(actions.removeCard(id)),
    addCardHandler: (itemData) => dispatch(actions.addCard(itemData))
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
