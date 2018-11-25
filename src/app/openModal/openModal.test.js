import openModal from './openModal';
describe('openModal', () => {
  const heading = document.createElement('h1');
  heading.textContent = 'Hello';
  const modal = openModal(heading);
  it("should have button with X as text context as it's first child", () => {
    const testButton = modal.firstElementChild;
    expect(testButton.tagName).toMatch('BUTTON');
    expect(modal.textContent).toMatch('X');
  });
  it('should return div with the openModal argument  as its second  child ', () => {
    expect(modal.children[1]).toEqual(heading);
  });
});
