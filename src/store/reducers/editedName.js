import { updateObject } from "../../shared/utility";

const initialState = {
  oldName: "",
  newName: "",
  id: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDITED_NAME":
      const updatedState = {
        oldName: action.oldName,
        newName: action.newName,
        id: action.id
      };
      return updateObject(state, updatedState);
    default:
      return state;
  }
};

export default reducer;
