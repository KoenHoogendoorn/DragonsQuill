export const sortContent = () => {
  return {
    type: "SORT_CONTENT"
  };
};

export const highlightCard = (id) => {
  return {
    type: "HIGHLIGHT_CARD",
    id: id
  };
};

export const toggleCard = (id) => {
  return {
    type: "TOGGLE_CARD",
    id: id
  };
};

export const removeNPC = (id) => {
  return {
    type: "REMOVE_NPC",
    id: id
  };
};

export const addNPC = (npc) => {
  return {
    type: "ADD_NPC",
    npc: npc
  };
};

export const closeCards = (newActiveTab) => {
  return {
    type: "CLOSE_CARDS",
    newActiveTab: newActiveTab
  };
};
