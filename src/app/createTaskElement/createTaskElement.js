const createTaskElement = ({ title, description, id }) => {
  const taskElement = document.createElement("article");
  taskElement.id = id;
  taskElement.className = "task";
  taskElement.innerHTML = `
    <p id="${id}-title">${title}</p>
    <p id="${id}-description">${description}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;

  return taskElement;
};

export default createTaskElement;
