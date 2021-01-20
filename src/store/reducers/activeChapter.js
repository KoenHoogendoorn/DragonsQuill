import { updateObject } from "../../shared/utility";

const initialState = {
  activeChapter: "ch1"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_CHAPTER":
      const updatedState = { activeChapter: action.chapter };
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
