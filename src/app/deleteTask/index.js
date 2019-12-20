import { removeFromLS } from "../utilitiesLS/utilitiesLS";
const deleteTask = ({ parentElement }) => {
  const task = document.getElementById(parentElement.id);
  if (task) {
    task.remove();
  }
  removeFromLS(parentElement.id);
};

export default deleteTask;
