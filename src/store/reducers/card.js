import { updateObject } from "../../shared/utility";

const initialState = {
  state: " "
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CARD":
      //not only sets state but also changes elements on page with a specific id
      const selectedItem = document.getElementById(action.id);
      const content = selectedItem.lastChild;
      const chevronIcon = selectedItem.firstChild.lastChild;

      let updatedState = null;
      if (content.style.maxHeight) {
        // updatedState = { cardOpen: false };
        content.style.maxHeight = null;
        chevronIcon.style.transition = "transform 0.3s";
        chevronIcon.style.transform = "rotate(0deg)";
      } else {
        // updatedState = { cardOpen: true };
        content.style.maxHeight = content.scrollHeight + "px";
        chevronIcon.style.transition = "transform 0.3s";
        chevronIcon.style.transform = "rotate(-180deg)";
      }
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
