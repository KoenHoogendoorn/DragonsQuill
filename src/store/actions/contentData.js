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

export const removeCard = (id) => {
  return {
    type: "REMOVE_CARD",
    id: id
  };
};

export const addCard = (itemData) => {
  return {
    type: "ADD_CARD",
    itemData: itemData
  };
};

export const closeCards = (newActiveTab) => {
  return {
    type: "CLOSE_CARDS",
    newActiveTab: newActiveTab
  };
};

export const changeMentionCounters = (mentionIds, activeChapterId) => {
  return {
    type: "CHANGE_MENTION_COUNTERS",
    mentionIds: mentionIds,
    activeChapterId: activeChapterId
  };
};

export const overwriteContent = (newData) => {
  return {
    type: "OVERWRITE_CONTENT",
    newData: newData
  };
};

// export const changeMentionCounters = (mentionId, activeChapterId, addition) => {
//   return {
//     type: "CHANGE_MENTION_COUNTERS",
//     mentionId: mentionId,
//     activeChapterId: activeChapterId,
//     addition: addition
//   };
// };
