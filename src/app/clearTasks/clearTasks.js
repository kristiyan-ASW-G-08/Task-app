const clearTasks = () => {
  const clearTasksBtn = document.querySelector('.clear-tasks-btn');
  const tasksSection = document.querySelector('.tasks-section');
  const body = document.body;
  clearTasksBtn.addEventListener('click', e => {
    if (tasksSection.childElementCount) {
      Array.from(tasksSection.children).forEach(child => child.remove());
      localStorage.clear();
    } else {
      if (body.firstChild.className === 'alert') {
      } else {
        const alert = document.createElement('p');
        alert.className = 'alert';
        alert.textContent = "There aren't any tasks";
        body.insertBefore(alert, body.childNodes[0]);
        setTimeout(() => {
          alert.remove();
        }, 2000);
      }
    }
  });
};
export default clearTasks;
