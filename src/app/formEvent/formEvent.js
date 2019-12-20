import { getFormData } from "../utilities/utilities";
import { saveToLS } from "../utilitiesLS/utilitiesLS";
import createTaskElement from "../createTaskElement/createTaskElement";
const formEvent = () => {
  const form = document.getElementById("add-form");
  if (form !== null) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const id = (Date.now() + Math.random()).toString();
      const task = { ...getFormData(e.target.children), id };
      saveToLS(task);
      document
        .getElementById("tasks-container")
        .appendChild(createTaskElement(task));

      e.target.reset();
    });
  }
};

export default formEvent;
