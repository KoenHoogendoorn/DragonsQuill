import { updateObject } from "../../shared/utility";

const initialState = {
  state: " "
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CARD":
      const selectedItem = document.getElementById(action.id);
      const content = selectedItem.lastChild;
      const chevronIcon = selectedItem.firstChild.lastChild;
      let updatedState = null;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        chevronIcon.style.transition = "transform 0.3s";
        chevronIcon.style.transform = "rotate(0deg)";
      } else {
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
