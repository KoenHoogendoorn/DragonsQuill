import { updateObject } from "../../shared/utility";

const initialState = {
  activeTab: "Chapters"
  // all possible tabs:
  //   - "Chapters"
  //   - "NPCs"
  //   - "Locations"
  //   - "Monsters"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_TAB":
      const updatedState = { activeTab: action.contentType };
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
