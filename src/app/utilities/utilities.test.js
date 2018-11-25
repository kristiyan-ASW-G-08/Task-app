import utilities from './utilities';
describe('utilities', () => {
  const tasksArr = [
    { name: 'task1', description: 'description1', id: 1 },
    { name: 'task2', description: 'description2', id: 2 },
    { name: 'task3', description: 'description3', id: 3 }
  ];
  describe('addTask', () => {
    it('should add task ', () => {
      const newTask = { name: 'task4', description: 'description4', id: 4 };
      expect(utilities.addItem(tasksArr, newTask)).toEqual([
        { name: 'task1', description: 'description1', id: 1 },
        { name: 'task2', description: 'description2', id: 2 },
        { name: 'task3', description: 'description3', id: 3 },
        { name: 'task4', description: 'description4', id: 4 }
      ]);
    });
  });
  describe('removeTask', () => {
    const id = 1;
    it('should remove task', () => {
      expect(utilities.removeItem(tasksArr, id)).toEqual([
        { name: 'task2', description: 'description2', id: 2 },
        { name: 'task3', description: 'description3', id: 3 }
      ]);
    });
  });
  describe('editTask', () => {
    const id = 1;
    const editedTask = {
      name: 'task1Edited',
      description: 'description1Edited',
      id: 1
    };
    it('should remove task', () => {
      expect(utilities.editItem(tasksArr, id, editedTask)).toEqual([
        { name: 'task2', description: 'description2', id: 2 },
        { name: 'task3', description: 'description3', id: 3 },
        { name: 'task1Edited', description: 'description1Edited', id: 1 }
      ]);
    });
  });
  describe('getFormData', () => {
    it('should return object with all the data from form ', () => {
      const formElements = {
        name: { name: 'name', value: 'task1' },
        description: { name: 'description', value: 'description1' }
      };
      expect(utilities.getFormData(formElements)).toEqual({
        name: 'task1',
        description: 'description1'
      });
    });
  });
  describe('setFormData', () => {
    it('should return edited formElements object', () => {
      const formElements = {
        name: { name: 'name', value: 'task1' },
        description: { name: 'description', value: 'description1' }
      };
      const task = {
        name: 'editedName',
        description: 'editedDescription'
      };
      expect(utilities.setFormData(formElements, task)).toEqual({
        description: { name: 'description', value: 'editedDescription' },
        name: { name: 'name', value: 'editedName' }
      });
    });
  });
});
