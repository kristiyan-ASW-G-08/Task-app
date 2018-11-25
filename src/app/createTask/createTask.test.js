import createTask from './createTask';
describe('createTask', () => {
  const task = {
    id: 1,
    name: 'taskName',
    description: 'taskDescription'
  };
  const ls = localStorage;
  ls.setItem('tasks', JSON.stringify(task));
  const testTaskElement = document.createElement('details');
  testTaskElement.innerHTML = `
  <summary>${task.name}</summary>
  <p>${task.description}</p>
  <button>delete</button>
  <button>edit</button>
  `;
  const taskElement = createTask(task);
  document.body.appendChild(taskElement);
  const body = document.body;
  it('should return details element that  has the same children as testTaskElement', () => {
    Array.from(testTaskElement.children).forEach((child, index) => {
      expect(child.textContent).toMatch(
        taskElement.children[index].textContent
      );
      expect(child.tagName).toMatch(taskElement.children[index].tagName);
    });
    expect(taskElement.childElementCount).toEqual(
      testTaskElement.childElementCount
    );
  });
  describe('clicking delete btn', () => {
    const deleteBtn = body.firstElementChild.children[2];
    beforeEach(() => {
      deleteBtn.click();
    });
    it('shoud be delete btn', () => {
      expect(deleteBtn.textContent).toMatch('delete');
    });
    it('should  remove task from dom  when delete btn is clicked', () => {
      expect(body.childElementCount).toBe(0);
    });
    it('should remove task from localStorage when delete btn is clicked', () => {
      expect(JSON.parse(localStorage.getItem('tasks'))).toEqual([]);
    });
  });
});
