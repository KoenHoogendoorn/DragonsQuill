import { updateObject } from "../../shared/utility";

const initialState = {
  adventure: [
    {
      id: "ad0",
      value: ""
    }
  ],
  chapters: [
    {
      id: "ch0",
      value: "Chapters"
    }
  ],
  npcs: [
    {
      id: "np0",
      value: "NPC's",
      disabled: true
    }
  ],
  monsters: [
    {
      id: "mo0",
      value: "Monsters",
      disabled: true
    }
  ],
  locations: [
    {
      id: "lo0",
      value: "Locations",
      disabled: true
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
      let adventure5 = state.adventure.slice();
      let chapters5 = state.chapters.slice();
      let npcs5 = state.npcs.slice();
      let monsters5 = state.monsters.slice();
      let locations5 = state.locations.slice();

      switch (action.id.substring(0, 2)) {
        case "ad":
          //filter here only shows the items where the id is not the passed id. So it leaves all others.
          adventure5 = adventure5.filter((adventure) => {
            return adventure.id !== action.id;
          });
          break;
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
        adventure: adventure5,
        chapters: chapters5,
        npcs: npcs5,
        monsters: monsters5,
        locations: locations5
      };
      return updateObject(state, updatedState5);

    case "ADD_CARD":
      let adventure4 = state.adventure.slice();
      let chapters4 = state.chapters.slice();
      let npcs4 = state.npcs.slice();
      let monsters4 = state.monsters.slice();
      let locations4 = state.locations.slice();

      switch (action.itemData.id.substring(0, 2)) {
        case "ad":
          adventure4.push(action.itemData);
          break;
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
        adventure: adventure4,
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

    case "OVERWRITE_ALL_CONTENT":
      // overwrites all content. Input is array.
      // adventure won't work if it's only one
      let adventure8 = state.adventure.slice();
      let chapters8 = state.chapters.slice();
      let npcs8 = state.npcs.slice();
      let monsters8 = state.monsters.slice();
      let locations8 = state.locations.slice();

      let localAdventure = action.newData[0];
      let localChapters = action.newData[1];
      let localNpcs = action.newData[2];
      let localMonsters = action.newData[3];
      let localLocations = action.newData[4];

      adventure8 = localAdventure;
      chapters8 = localChapters;
      npcs8 = localNpcs;
      monsters8 = localMonsters;
      locations8 = localLocations;

      const updatedState8 = {
        adventure: adventure8,
        chapters: chapters8,
        npcs: npcs8,
        monsters: monsters8,
        locations: locations8
      };

      return updateObject(state, updatedState8);

    // case "OVERWRITE_ITEM":
    //   let adventure9 = state.adventure.slice();
    //   let chapters9 = state.chapters.slice();
    //   let npcs9 = state.npcs.slice();
    //   let monsters9 = state.monsters.slice();
    //   let locations9 = state.locations.slice();

    //   switch (action.id.substring(0, 2)) {
    //     case "ad":
    //       const index = adventure9.findIndex((adventure) => {
    //         return adventure.id === action.id;
    //       });
    //       adventure9.splice(index, 1, action.itemData); //startindex, how many elements of array to delete, what to add.
    //       break;
    //     case "ch":
    //       const index2 = chapters9.findIndex((chapter) => {
    //         return chapter.id === action.id;
    //       });
    //       chapters9.splice(index2, 1, action.itemData);
    //       break;
    //     case "np":
    //       const index3 = npcs9.findIndex((npc) => {
    //         return npc.id === action.id;
    //       });
    //       npcs9.splice(index3, 1, action.itemData);
    //       break;
    //     case "mo":
    //       monsters9 = monsters9.filter((monster) => {
    //         return monster.id !== action.id;
    //       });
    //       break;
    //     case "lo":
    //       locations9 = locations9.filter((location) => {
    //         return location.id !== action.id;
    //       });
    //       break;
    //     default:
    //       break;
    //   }
    //   const updatedState9 = {
    //     adventure: adventure9,
    //     chapters: chapters9,
    //     npcs: npcs9,
    //     monsters: monsters9,
    //     locations: locations9
    //   };
    //   return updateObject(state, updatedState9);

    default:
      return state;
  }
};
export default reducer;
