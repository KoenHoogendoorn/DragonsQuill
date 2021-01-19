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
      // ----
      // const mentions = document.getElementsByClassName("mention");
      // const mentionsCopy = [...mentions];
      // ---
      // const mentionFromAtt = document.querySelector(`[data-id='${action.id}']`);
      // mentionFromAtt.setAttribute("onClick", "alert('blah');");
      // mentionFromAtt.style.cursor = "pointer";
      // mentionFromAtt.style.userSelect = "none";

      let updatedState = null;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        chevronIcon.style.transition = "transform 0.3s";
        chevronIcon.style.transform = "rotate(0deg)";
        // ----
        // mentionsCopy.forEach((mention) => {
        //   mention.style.background = "blue";
        // });
        // ----
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        chevronIcon.style.transition = "transform 0.3s";
        chevronIcon.style.transform = "rotate(-180deg)";
        // ----
        // mentionsCopy.forEach((mention) => {
        //   mention.style.background = "red";
        // });
        // ----
      }
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
