import { updateObject } from "../../shared/utility";
import Norlbelorg from "../../assets/images/norlbelorg.png";
import BeachBattleMap from "../../assets/images/BeachBattleMap.jpg";

const initialState = {
  adventure: {
    id: "ad0",
    value: "Moonhaven's curse"
  },
  chapters: [
    {
      id: "ch0",
      value: "Chapters"
    },
    {
      id: "ch1",
      value: "The Beach",
      mentionIds: {
        npc: [],
        monster: [],
        location: []
      }
    },
    {
      id: "ch2",
      value: "Entering Moonhaven",
      mentionIds: {
        npc: [],
        monster: [],
        location: []
      }
    }
  ],
  npcs: [
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
  monsters: [
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
  locations: [
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
};

const pushHeadersFirst = (contentTypeArray) => {
  contentTypeArray.sort((a, b) => {
    return a.disabled === true ? -1 : b.disabled === true ? 1 : 0;
  });
  return contentTypeArray;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SORT_CONTENT":
      let chapters = state.chapters.slice();
      let npcs = state.npcs.slice();
      let monsters = state.monsters.slice();
      let locations = state.locations.slice();

      const sortIds = (a, b) => {
        return (
          Number(a.id.match(/(\d+)/g)[0]) - Number(b.id.match(/(\d+)/g)[0])
        );
      };
      //chapters sort by the numbers in their ids
      chapters.sort(sortIds);
      npcs.sort((a, b) =>
        a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
      );
      monsters.sort((a, b) =>
        a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
      );
      locations.sort((a, b) =>
        a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
      );

      // -- make sure the headers stay in front for the mention dropdown

      pushHeadersFirst(npcs);
      pushHeadersFirst(monsters);
      pushHeadersFirst(locations);

      const updatedState = {
        chapters: chapters,
        npcs: npcs,
        monsters: monsters,
        locations: locations
      };

      return updateObject(state, updatedState);

    case "TOGGLE_CARD":
      const selectedItemHtml = document.getElementById(action.id);
      const content = selectedItemHtml.lastChild; //content = CardBody component
      //----
      const clickedId = action.id;
      let npcs2 = state.npcs.slice();
      let monsters2 = state.monsters.slice();
      let locations2 = state.locations.slice();

      const toggleCard = (contentTypeArray) => {
        const clickedItem = contentTypeArray.find(
          (item) => item.id === clickedId
        );

        clickedItem.open = !clickedItem.open;
        if (!clickedItem.open) {
          clickedItem.highlighted = false;
        }

        //show and open clicked html card content
        if (clickedItem.open) {
          content.style.maxHeight = content.scrollHeight + 17 + "px"; //+17 because the cardtoolbar has a margin-bottom of -17
        } else {
          content.style.maxHeight = null;
        }
      };

      //only go through one contenttype array
      switch (clickedId.substring(0, 2)) {
        case "np":
          toggleCard(npcs2);
          break;
        case "mo":
          toggleCard(monsters2);
          break;
        case "lo":
          toggleCard(locations2);
          break;
        default:
          break;
      }
      const updatedState2 = {
        npcs: npcs2,
        monsters: monsters2,
        locations: locations2
      };
      return updateObject(state, updatedState2);

    case "HIGHLIGHT_CARD":
      const highlightedId = action.id;
      let npcs3 = state.npcs.slice();
      let monsters3 = state.monsters.slice();
      let locations3 = state.locations.slice();

      const pushCardFirst = (contentTypeArray) => {
        contentTypeArray.sort((a, b) => {
          return a.id === highlightedId ? -1 : b.id === highlightedId ? 1 : 0;
        });
        return contentTypeArray;
      };

      const setHighlighted = (contentTypeArray) => {
        // set all items highlighted = false so when they're clicked,
        // they don't affect others that have highlighted = true.
        // They don't change the order of others.
        contentTypeArray.forEach((item) => {
          item.highlighted = false;
        });

        const clickedItem = contentTypeArray.find(
          (item) => item.id === highlightedId
        );
        clickedItem.highlighted = true;
      };

      switch (highlightedId.substring(0, 2)) {
        case "np":
          pushCardFirst(npcs3);
          setHighlighted(npcs3);
          break;
        case "mo":
          pushCardFirst(monsters3);
          setHighlighted(monsters3);
          break;
        case "lo":
          pushCardFirst(locations3);
          setHighlighted(locations3);
          break;
        default:
          break;
      }

      // -- make sure the headers stay in front for the mention dropdown
      pushHeadersFirst(npcs3);
      pushHeadersFirst(monsters3);
      pushHeadersFirst(locations3);

      const updatedState3 = {
        npcs: npcs3,
        monsters: monsters3,
        locations: locations3
      };
      return updateObject(state, updatedState3);

    case "REMOVE_CARD":
      let chapters5 = state.chapters.slice();
      let npcs5 = state.npcs.slice();
      let monsters5 = state.monsters.slice();
      let locations5 = state.locations.slice();

      switch (action.id.substring(0, 2)) {
        case "ch":
          chapters5 = chapters5.filter((chapter) => {
            return chapter.id !== action.id;
          });
          break;
        case "np":
          npcs5 = npcs5.filter((npc) => {
            return npc.id !== action.id;
          });
          break;
        case "mo":
          monsters5 = monsters5.filter((monster) => {
            return monster.id !== action.id;
          });
          break;
        case "lo":
          locations5 = locations5.filter((location) => {
            return location.id !== action.id;
          });
          break;
        default:
          break;
      }
      const updatedState5 = {
        chapters: chapters5,
        npcs: npcs5,
        monsters: monsters5,
        locations: locations5
      };
      return updateObject(state, updatedState5);

    case "ADD_CARD":
      let chapters4 = state.chapters.slice();
      let npcs4 = state.npcs.slice();
      let monsters4 = state.monsters.slice();
      let locations4 = state.locations.slice();

      switch (action.itemData.id.substring(0, 2)) {
        case "ch":
          chapters4.push(action.itemData);
          break;
        case "np":
          npcs4.push(action.itemData);
          break;
        case "mo":
          monsters4.push(action.itemData);
          break;
        case "lo":
          locations4.push(action.itemData);
          break;
        default:
          break;
      }
      const updatedState4 = {
        chapters: chapters4,
        npcs: npcs4,
        monsters: monsters4,
        locations: locations4
      };
      return updateObject(state, updatedState4);

    case "CLOSE_CARDS":
      let npcs6 = state.npcs.slice();
      let monsters6 = state.monsters.slice();
      let locations6 = state.locations.slice();

      switch (action.newActiveTab) {
        case "NPCs":
          monsters6.forEach((monster) => {
            monster.open = false;
          });
          locations6.forEach((location) => {
            location.open = false;
          });
          break;
        case "Monsters":
          npcs6.forEach((npc) => {
            npc.open = false;
          });
          locations6.forEach((location) => {
            location.open = false;
          });
          break;
        case "Locations":
          npcs6.forEach((npc) => {
            npc.open = false;
          });
          monsters6.forEach((monster) => {
            monster.open = false;
          });
          break;
        default:
          break;
      }

      const updatedState6 = {
        npcs: npcs6,
        monsters: monsters6,
        locations: locations6
      };
      return updateObject(state, updatedState6);

    case "CHANGE_MENTION_COUNTERS":
      let chapters7 = state.chapters.slice();
      const editedChapter = chapters7.find(
        (chapter) => chapter.id === action.activeChapterId
      );

      const mentionIds = action.mentionIds;

      const npcMentions = mentionIds.filter(
        (id) => id.substring(0, 2) === "np"
      );
      editedChapter.mentionIds.npc = npcMentions;

      const monsterMentions = mentionIds.filter(
        (id) => id.substring(0, 2) === "mo"
      );
      editedChapter.mentionIds.monster = monsterMentions;

      const locationMentions = mentionIds.filter(
        (id) => id.substring(0, 2) === "lo"
      );
      editedChapter.mentionIds.location = locationMentions;

      updateObject(chapters7, editedChapter);

      const updatedState7 = {
        chapters: chapters7
      };
      return updateObject(state, updatedState7);

    case "OVERWRITE_CONTENT":
      //let chapters8 = action.chapters;
      let npcs8 = state.npcs.slice();
      let localDataNpcs = action.newData;
      // let monsters8 = action.monsters;
      // let locations8 = action.locations;
      npcs8 = localDataNpcs;

      const updatedState8 = {
        // chapters: chapters8,
        npcs: npcs8
        // monsters: monsters8,
        // locations: locations8
      };

      return updateObject(state, updatedState8);

    default:
      return state;
  }
};
export default reducer;
