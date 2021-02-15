export const editedName = (oldName, newName, id) => {
  return {
    type: "EDITED_NAME",
    oldName: oldName,
    newName: newName,
    id: id
  };
};
