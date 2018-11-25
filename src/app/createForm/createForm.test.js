import createForm from './createForm';
describe('createForm', () => {
  document.body.innerHTML = `
  <div class="modal"></div>
  `;
  const body = document.body;
  const modal = document.querySelector('.modal');
  it("should return form with button that has 'Add Task' as it's text content when 'add' is passed ", () => {
    expect(createForm('add').children[2].textContent).toEqual('Add Task');
  });
  it("should return form with button that has 'Edit Task' as it's text content when 'edit' is passed ", () => {
    const editTask = { id: 1, name: 'taskName', desription: 'taskDescription' };
    expect(createForm('edit', editTask).children[2].textContent).toEqual(
      'Edit Task'
    );
  });
  it('should submit', () => {
    modal.appendChild(createForm('add'));
    const form = modal.firstElementChild;
    const spy = jest.spyOn(form, 'submit');
    form.submit();
    expect(spy).toHaveBeenCalled();
  });
});
