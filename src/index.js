'use strict';
import './style/index.scss';
import openModal from './app/openModal/openModal';
import createForm from './app/createForm/createForm';
import createTask from './app/createTask/createTask';
import openTaskFormBtnToggle from './app/openFormBtnToggle/openFormBtnToggle';
import clearTasks from './app/clearTasks/clearTasks';
const openTaskFormBtn = document.querySelector('.open-form-btn');
clearTasks();
openTaskFormBtn.addEventListener('click', e => {
  const body = document.body;
  if (body.firstElementChild.className === 'modal') {
    body.firstElementChild.remove();
    openTaskFormBtnToggle();
  } else {
    body.insertBefore(openModal(createForm('add')), body.childNodes[0]);
    openTaskFormBtnToggle();
  }
});
if (localStorage.getItem('tasks')) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const tasksSection = document.querySelector('.tasks-section');
  tasks.forEach(task => {
    tasksSection.appendChild(createTask(task));
  });
}
