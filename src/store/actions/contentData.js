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

export const addNPC = (newNPC) => {
  return {
    type: "ADD_NPC",
    newNPC: newNPC
  };
};
