const addItem = (arr, item) => {
  return [...arr, item];
};
const removeItem = (arr, id) => {
  return arr.filter(item => item.id !== id);
};
const editItem = (arr, id, editedItem) => {
  return addItem(removeItem(arr, id), editedItem);
};
const getFormData = formElements => {
  const formData = {};
  Object.values(formElements).forEach(element => {
    if (element.type === 'submit') {
    } else {
      formData[element.name] = element.value;
    }
  });
  return formData;
};
const setFormData = (formElements, item) => {
  const editedFormElements = { ...formElements };
  Object.values(editedFormElements).forEach(element => {
    if (element.type === 'submit') {
    } else {
      element.value = item[element.name];
    }
  });
  return editedFormElements;
};

const utilities = {
  removeItem,
  addItem,
  editItem,
  getFormData,
  setFormData,
};
export default utilities;
