import { updateObject } from "../../shared/utility";

const initialState = {
  chapters: [
    {
      id: "ch1",
      name: "The Beach"
    },
    {
      id: "ch2",
      name: "Entering Moonhaven"
    },
    { id: "ch3", name: "The dinner fight" },
    { id: "ch4", name: "Ubal’s house" }
  ],
  npcs: [
    {
      id: "npcs-header",
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
      id: "monsters-header",
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
      let npcs = state.npcs.slice();
      let monsters = state.monsters.slice();

      npcs.sort((a, b) =>
        a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
      );
      monsters.sort((a, b) =>
        a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
      );

      // -- make sure the headers stay in front for the mention dropdown

      pushHeadersFirst(npcs);
      pushHeadersFirst(monsters);

      // monsters.forEach((element) => {
      //   element.open = false;
      //   element.highlighted = false;
      // });

      const updatedState = {
        npcs: npcs,
        monsters: monsters
      };
      return updateObject(state, updatedState);

    case "TOGGLE_CARD":
      const selectedItemHtml = document.getElementById(action.id);
      const content = selectedItemHtml.lastChild; //content = CardBody component
      //----
      const clickedId = action.id;
      let npcs2 = state.npcs.slice();
      let monsters2 = state.monsters.slice();

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
        default:
          break;
      }
      const updatedState2 = {
        npcs: npcs2,
        monsters: monsters2
      };
      return updateObject(state, updatedState2);

    case "HIGHLIGHT_CARD":
      const highlightedId = action.id;
      let npcs3 = state.npcs.slice();
      let monsters3 = state.monsters.slice();

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
        default:
          break;
      }

      // -- make sure the headers stay in front for the mention dropdown
      pushHeadersFirst(npcs3);
      pushHeadersFirst(monsters3);

      const updatedState3 = {
        npcs: npcs3,
        monsters: monsters3
      };
      return updateObject(state, updatedState3);

    case "ADD_NPC":
      let npcs4 = state.npcs.slice();
      npcs4.push(action.NPCEditor);
      const updatedState4 = {
        npcs: npcs4
      };
      return updateObject(state, updatedState4);
    default:
      return state;
  }
};
export default reducer;
