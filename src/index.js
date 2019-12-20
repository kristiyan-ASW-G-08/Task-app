"use strict";
import "./style/index.scss";
import formEvent from "./app/formEvent/formEvent";
import editFormEvent from "./app/editFormEvent";
import deleteTask from "./app/deleteTask";
import openEditForm from "./app/openEditForm";
import createTaskElement from "./app/createTaskElement/createTaskElement";
const events = {
  "delete-btn": deleteTask,
  "edit-btn": openEditForm
};
document.addEventListener("DOMContentLoaded", event => {
  formEvent();
  editFormEvent();
  document.body.addEventListener("click", ({ target }) => {
    if (target.className) {
      events[target.className](target);
    }
  });
  if (localStorage.getItem("tasks")) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const tasksFragment = document.createDocumentFragment();
    tasks.forEach(task => {
      tasksFragment.appendChild(createTaskElement(task));
    });
    document.getElementById("tasks-container").appendChild(tasksFragment);
  }
});
