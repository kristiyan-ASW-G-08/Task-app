export const addItem = (arr, item) => {
  return [...arr, item];
};
export const removeItem = (arr, id) => {
  return arr.filter(item => item.id !== id);
};
export const editItem = (arr, id, editedItem) => {
  return addItem(removeItem(arr, id), editedItem);
};
export const getFormData = formElements => {
  const formData = {};
  Object.values(formElements).forEach(element => {
    if (element.type === "submit") {
    } else {
      formData[element.name] = element.value;
    }
  });
  return formData;
};
export const setFormData = (formElements, item) => {
  const editedFormElements = { ...formElements };
  Object.values(editedFormElements).forEach(element => {
    if (element.type === "submit") {
    } else {
      element.value = item[element.name];
    }
  });
  return editedFormElements;
};
