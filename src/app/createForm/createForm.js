import createTask from '../createTask/createTask';
import utilities from '../utilities/utilities';
import utilitiesLS from '../utilitiesLS/utilitiesLS';
import openFormBtnToggle from '../openFormBtnToggle/openFormBtnToggle';
const createForm = (type, editTask, removeTask) => {
  const tasksSection = document.querySelector('.tasks-section');
  let btnContent = '';
  if (type === 'add') {
    btnContent = 'Add Task';
  } else if (type === 'edit') {
    btnContent = 'Edit Task';
  }
  const taskForm = document.createElement('form');
  taskForm.className = 'task-form';
  taskForm.innerHTML = `
  <input type="text" name="name" placeholder="Task Name" required>
  <input type="text" name="description" placeholder="Task Description" required>
  <button class="submit-btn">${btnContent}</button>`;
  const formElements = taskForm.elements;
  if (type === 'edit') {
    utilities.setFormData(formElements, editTask);
  }
  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    if (type === 'add') {
      const newTask = utilities.getFormData(formElements);
      newTask['id'] = utilitiesLS.createId();
      utilitiesLS.saveToLS('tasks', newTask);
      tasksSection.appendChild(createTask(newTask));
    } else if (type === 'edit') {
      const editedTask = utilities.getFormData(formElements);
      removeTask();
      tasksSection.appendChild(createTask(editedTask));
      editedTask['id'] = editTask.id;
      utilitiesLS.editItemFromLS('tasks', editTask.id, editedTask);
    }
    openFormBtnToggle();

    taskForm.parentElement.remove();
  });
  return taskForm;
};
export default createForm;
