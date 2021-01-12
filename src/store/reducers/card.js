import { updateObject } from "../../shared/utility";

const initialState = {
  cardOpen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CARD":
      const content = document.getElementById(action.id);
      let updatedState = null;
      if (content.style.maxHeight) {
        updatedState = { cardOpen: false };
        content.style.maxHeight = null;
      } else {
        updatedState = { cardOpen: true };
        content.style.maxHeight = content.scrollHeight + "px";
      }
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
