import { removeItem, editItem } from "../utilities/utilities";
export const setToLS = (target, value) => {
  localStorage.setItem(target, JSON.stringify(value));
};
export const createId = () => {
  const id = parseInt(JSON.parse(localStorage.getItem("Id"))) || 1;
  return id + 1;
};
export const editTaskLS = (id, editedTask) => {
  const tasks = editItem(
    JSON.parse(localStorage.getItem("tasks")),
    id,
    editedTask
  );
  setToLS("tasks", tasks);
};
export const saveToLS = item => {
  let items = [];
  if (localStorage.getItem("tasks")) {
    items = [...JSON.parse(localStorage.getItem("tasks")), item];
  } else {
    items = [item];
  }
  localStorage.setItem("tasks", JSON.stringify(items));
};
export const removeFromLS = id => {
  const editedTasks = removeItem(JSON.parse(localStorage.getItem("tasks")), id);
  setToLS("tasks", editedTasks);
};
