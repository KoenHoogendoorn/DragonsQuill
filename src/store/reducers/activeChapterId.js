import { updateObject } from "../../shared/utility";

const initialState = {
  activeChapterId: "ch1"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_CHAPTER":
      const updatedState = { activeChapterId: action.chapter };
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
