import openFormBtnToggle from './openFormBtnToggle';
describe('openFormBtnToggle', () => {
  document.body.innerHTML = `
    <button class="open-form-btn">Add Task</button>
    `;
  const openFormBtn = document.querySelector('.open-form-btn');
  it('if openFormBtn has textContext "Add Task" it will be changed to "Close"', () => {
    openFormBtnToggle();
    expect(openFormBtn.textContent).toMatch('Close');
  });
  it('if openFormBtn has textContext "Close" it will be changed to "Add Task"', () => {
    openFormBtn.textContent = 'Close';
    openFormBtnToggle();
    expect(openFormBtn.textContent).toMatch('Add Task');
  });
});
