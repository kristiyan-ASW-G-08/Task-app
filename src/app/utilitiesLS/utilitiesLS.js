import utilities from '../utilities/utilities';
const setToLS = (target, value) => {
  localStorage.setItem(target, JSON.stringify(value));
};
const createId = () => {
  let Id;
  if (localStorage.getItem('Id')) {
    Id = parseInt(JSON.parse(localStorage.getItem('Id')));
    Id++;
  } else {
    Id = 1;
  }
  setToLS('Id', Id);
  return Id;
};
const editItemFromLS = (target, id, editedItem) => {
  const items = JSON.parse(localStorage.getItem(target));
  const editedItems = utilities.editItem(items, id, editedItem);
  setToLS(target, editedItems);
};
const saveToLS = (target, item) => {
  let items;
  if (localStorage.getItem(target)) {
    items = utilities.addItem(JSON.parse(localStorage.getItem(target)), item);
  } else {
    items = utilities.addItem([], item);
  }
  setToLS(target, items);
};
const removeFromLS = (target, id) => {
  const items = [...JSON.parse(localStorage.getItem(target))];
  const editedItems = utilities.removeItem(items, id);
  setToLS(target, editedItems);
};
const utilitiesLS = {
  setToLS,
  saveToLS,
  removeFromLS,
  createId,
  editItemFromLS
};
export default utilitiesLS;
