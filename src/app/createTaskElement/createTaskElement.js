const createTaskElement = (title, description, id) => {
  const taskElement = document.createElement("article");
  taskElement.setAttribute("id", id);
  taskElement.class = "task";
  taskElement.innerHTML = `
    <p>${title}</p>
    <p>${description}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;

  return taskElement;
};

export default createTaskElement;
