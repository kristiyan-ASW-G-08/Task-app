const openEditForm = ({ parentElement }) => {
  const { id } = parentElement;
  const title = document.getElementById(`${id}-title`).textContent;
  const description = document.getElementById(`${id}-description`).textContent;
  const titleInput = document.getElementById("edit-title");
  const descriptionInput = document.getElementById("edit-description");
  const idInput = document.getElementById("edit-id");
  titleInput.value = title;
  descriptionInput.value = description;
  idInput.value = id;
  const editFormModal = document.getElementById("edit-form-modal");
  editFormModal.classList.add("modal-active");
};

export default openEditForm;
