import openFormBtnToggle from '../openFormBtnToggle/openFormBtnToggle';
const openModal = child => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const removeModalBtn = document.createElement('button');
  removeModalBtn.textContent = 'X';
  removeModalBtn.className = 'remove-modal-btn';
  modal.appendChild(removeModalBtn);
  modal.appendChild(child);
  removeModalBtn.addEventListener('click', e => {
    modal.remove();
    openFormBtnToggle();
  });
  return modal;
};
export default openModal;
