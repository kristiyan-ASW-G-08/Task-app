export const addItem = (arr, item) => {
  return [...arr, item];
};
export const removeItem = (arr, id) => arr.filter(item => item.id !== id);
export const createId = () => {
  if (!JSON.parse(localStorage.getItem("Id"))) {
    return 1;
  }
  const currentId = parseInt(JSON.parse(localStorage.getItem("Id"))) || 1;
  return;
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
