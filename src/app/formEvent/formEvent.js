import { getFormData } from "../utilities/utilities";
import { saveToLS } from "../utilitiesLS/utilitiesLS";
import createTaskElement from "../createTaskElement/createTaskElement";
const formEvent = () => {
  const form = document.getElementById("task-form");
  if (form !== null) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const newTask = getFormData(e.target.children);
      saveToLS(newTask);
      document
        .getElementById("tasks-container")
        .appendChild(createTaskElement(newTask));
    });
  }
};

export default formEvent;
