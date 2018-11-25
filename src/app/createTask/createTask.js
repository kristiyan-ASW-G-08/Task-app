import utilitiesLS from '../utilitiesLS/utilitiesLS';
import openModal from '../openModal/openModal';
import createForm from '../createForm/createForm';
import openFormBtnToggle from '../openFormBtnToggle/openFormBtnToggle';
const createTask = task => {
  const taskElement = document.createElement('details');
  taskElement.className = 'task';
  taskElement.innerHTML = `
    <summary>${task.name}</summary>
    <p>${task.description}</p>
    `;
  const removeTask = () => {
    taskElement.remove();
    utilitiesLS.removeFromLS('tasks', task.id);
  };
  const btns = [{ type: 'delete' }, { type: 'edit' }];
  btns.forEach(btnData => {
    const btn = document.createElement('button');
    btn.textContent = btnData.type;
    btn.className = `btn-${btnData.type}`;
    btn.addEventListener('click', e => {
      if (btnData.type === 'delete') {
        removeTask();
      } else if (btnData.type === 'edit') {
        const body = document.body;
        if (body.firstElementChild.className === 'modal') {
          body.firstElementChild.remove();
          openFormBtnToggle();
        }
        const modal = openModal(createForm('edit', task, removeTask));
        body.insertBefore(modal, body.childNodes[0]);
        openFormBtnToggle();
      }
    });

    taskElement.appendChild(btn);
  });

  return taskElement;
};
export default createTask;
