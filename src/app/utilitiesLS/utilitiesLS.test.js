import utilitiesLS from './utilitiesLS';
describe('utilitiesLS', () => {
  const target = 'tasks';
  const item = { id: 1, name: 'task1', description: 'description1' };
  beforeEach(() => {
    localStorage.clear();
  });
  describe('setToLS', () => {
    it('should set item to ls', () => {
      utilitiesLS.setToLS(target, item);
      const ls = JSON.parse(localStorage.getItem(target));
      expect(ls).toEqual({
        id: 1,
        name: 'task1',
        description: 'description1'
      });
    });
  });
  describe('saveToLS', () => {
    it('should set item to ls after cheking if ls is empthy', () => {
      utilitiesLS.saveToLS(target, item);
      const ls = JSON.parse(localStorage.getItem(target));
      expect(ls).toEqual([
        { id: 1, name: 'task1', description: 'description1' }
      ]);
    });
  });
  describe('removeFromLS', () => {
    it('it should remove item from ls ', () => {
      const item1 = {
        id: 2,
        name: 'task2',
        description: 'description2'
      };
      utilitiesLS.saveToLS(target, item);
      utilitiesLS.saveToLS(target, item1);
      utilitiesLS.removeFromLS(target, item1.id);
      const ls = JSON.parse(localStorage.getItem(target));
      expect(ls).toEqual([
        { id: 1, name: 'task1', description: 'description1' }
      ]);
      expect(ls).not.toEqual([
        { id: 2, name: 'task2', description: 'some description' }
      ]);
    });
  });
  describe('editItemFromLS', () => {
    it('it should edit item from ls', () => {
      const editedItem = {
        id: 1,
        name: 'editedName',
        description: 'editedDescription'
      };
      utilitiesLS.saveToLS(target, item);
      utilitiesLS.editItemFromLS(target, item.id, editedItem);
      const ls = JSON.parse(localStorage.getItem(target));
      expect(ls).toEqual([
        {
          id: 1,
          name: 'editedName',
          description: 'editedDescription'
        }
      ]);
    });
  });
  describe('createId', () => {
    const targetId = 'Id';
    it('it should return id:1', () => {
      const id = utilitiesLS.createId();
      expect(id).toEqual(1);
    });
    it('it should increment the id by 1  every time createId is called', () => {
      const id = utilitiesLS.createId();
      const id2 = utilitiesLS.createId();
      expect(id2).toEqual(2);
    });
    it('should save id:1 to LS', () => {
      utilitiesLS.createId();
      const ls = JSON.parse(localStorage.getItem(targetId));
      expect(ls).toEqual(1);
    });
    it('should increment and  save id:1 to LS after being called second time', () => {
      utilitiesLS.createId();
      utilitiesLS.createId();
      const ls = JSON.parse(localStorage.getItem(targetId));
      expect(ls).toEqual(2);
    });
    it('should increment and save for every item in array', () => {
      const numArr = [...Array(100).keys()];
      numArr.forEach(num => {
        utilitiesLS.createId();
        const ls = JSON.parse(localStorage.getItem(targetId));
        expect(ls).toEqual(num + 1);
      });
    });
  });
});
