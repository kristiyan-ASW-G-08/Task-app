import { getFormData } from "../utilities/utilities";
import { editTaskLS } from "../utilitiesLS/utilitiesLS";
import createTaskElement from "../createTaskElement/createTaskElement";
const formEvent = () => {
  const form = document.getElementById("edit-form");
  if (form !== null) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const task = { ...getFormData(e.target.children) };
      editTaskLS(task.id, task);
      const oldTaskElement = document.getElementById(task.id);
      document
        .getElementById("tasks-container")
        .replaceChild(createTaskElement(task), oldTaskElement);
      const editFormModal = document.getElementById("edit-form-modal");

      editFormModal.classList.remove("modal-active");
      e.target.reset();
    });
  }
};

export default formEvent;
