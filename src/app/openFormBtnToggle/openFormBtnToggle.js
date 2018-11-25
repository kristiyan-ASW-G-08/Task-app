const openTaskFormBtnToggle = () => {
  const openTaskFormBtn = document.querySelector('.open-form-btn');
  if (openTaskFormBtn.textContent === 'Add Task') {
    openTaskFormBtn.textContent = 'Close';
  } else {
    openTaskFormBtn.textContent = 'Add Task';
  }
};
export default openTaskFormBtnToggle;
