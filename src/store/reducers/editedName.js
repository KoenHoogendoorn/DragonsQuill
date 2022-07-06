import { updateObject } from "../../shared/utility";

const initialState = {
  oldName: "",
  newName: "",
  id: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //This is added so that when a name changes in a cardd, it also changes in the mentions in the editor
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
