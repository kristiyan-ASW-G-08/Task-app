import clearTasks from './clearTasks';
describe('clearTasks', () => {
  jest.useFakeTimers();
  document.body.innerHTML = `
    <button  class="clear-tasks-btn">Clear Tasks</button>
    <section class="tasks-section"></section>
    `;
  const body = document.body;
  const clearTasksBtn = document.querySelector('.clear-tasks-btn');
  describe("tasks-section dosn't have  children", () => {
    beforeEach(() => {
      clearTasks();
      clearTasksBtn.click();
    });
    it("should display alert if section with class tasks-section dosn't have any children", () => {
      expect(body.firstElementChild.className).toMatch('alert');
    });
    it('should remove the alert after 2000 milliseconds', () => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      jest.advanceTimersByTime(2000);
      expect(body.firstElementChild.className).not.toMatch('alert');
      expect(body.firstElementChild.className).toMatch('clear-tasks-btn');
    });
  });
  describe('tasks section has children', () => {
    const tasksSection = document.querySelector('.tasks-section');
    const testChild = document.createElement('div');
    beforeEach(() => {
      tasksSection.appendChild(testChild);
    });

    it('should remove all children from tasks-section ', () => {
      clearTasks();
      clearTasksBtn.click();
      expect(tasksSection.childElementCount).toBe(0);
    });
    it('should clear localStorage', () => {
      const ls = localStorage;
      const testTask = { íd: 1, name: 'testTask', description: 'testTask' };
      ls.setItem('task', JSON.stringify(testTask));
      expect(JSON.parse(ls.getItem('task'))).toEqual(testTask);
      clearTasks();
      clearTasksBtn.click();
      expect(JSON.parse(ls.getItem('task'))).toEqual(null);
    });
  });
});
