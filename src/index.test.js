import puppeteer from 'puppeteer';
describe('index', () => {
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--windows-size=1920,1080']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:1234/');
  });
  afterAll(() => {
    browser.close();
  });
  it('should have title "Task app"', async () => {
    const title = await page.title();
    expect(title).toMatch('Task app');
  });
  describe('modal', () => {
    let modal;
    beforeAll(async () => {
      await page.waitForSelector('body');
      await page.click('button.open-form-btn');
      await page.waitForSelector('.modal');

      modal = await page.$eval('.modal', modal => {
        return {
          tagName: modal.tagName,
          className: modal.className,
          firstChild: {
            class: modal.firstElementChild.className,
            tagName: modal.firstElementChild.tagName
          },
          secondChild: {
            class: modal.children[1].className,
            tagName: modal.children[1].tagName
          }
        };
      });
    });
    it('modal should exist', () => {
      expect(modal).toBeTruthy();
    });
    it('modal should have className modal', () => {
      expect(modal.className).toMatch('modal');
    });
    it('modal should have tagName of div', () => {
      expect(modal.tagName).toMatch('DIV');
    });
    it('modal should have  button with class "remove-modal-btn" as first child', () => {
      expect(modal.firstChild.tagName).toMatch('BUTTON');
      expect(modal.firstChild.class).toMatch('remove-modal-btn');
    });
    it('modal should have  form with class "task-form" as second child', () => {
      expect(modal.secondChild.tagName).toMatch('FORM');
      expect(modal.secondChild.class).toMatch('task-form');
    });
    it('should be closed', async () => {
      await page.click('.remove-modal-btn');
      const modalElement = await page.evaluate(() =>
        document.querySelector('.modal')
      );
      expect(modalElement).toBeFalsy();
    });
  });
  describe(' task', () => {
    const task = {
      name: 'Task',
      description: 'To finish this task'
    };
    let taskElementData;
    let taskElement;

    beforeAll(async () => {
      await page.waitForSelector('.tasks-section');
      await page.click('button.open-form-btn');
      await page.type('input[name=name]', task.name);
      await page.type('input[name=description]', task.description);
      await page.$eval('.submit-btn', btn => btn.click());

      taskElement = await page.waitForSelector('.task');
      taskElementData = await page.$eval('.task', element => {
        const children = Object.values(element.children).map(child => {
          return {
            tagName: child.tagName,
            textContent: child.textContent
          };
        });
        return {
          tagName: element.tagName,
          children
        };
      });
    });
    describe('should add task', () => {
      it('taskSection should have 1 child', async () => {
        const tasksSectionCount = await page.$eval(
          '.tasks-section',
          element => element.childElementCount
        );
        expect(tasksSectionCount).toBe(1);
      });
      it('taskElement should exist', async () => {
        expect(taskElement).toBeTruthy();
      });
      it('task should have four children', () => {
        expect(taskElementData.children.length).toBe(4);
      });
      it('task should be have details tag', async () => {
        expect(taskElementData.tagName).toMatch('DETAILS');
      });
      it('task should have summary element as first child', () => {
        const child = taskElementData.children[0];
        expect(child.tagName).toMatch('SUMMARY');
        expect(child.textContent).toMatch(task.name);
      });
      it('task should have p element as second child', () => {
        const child = taskElementData.children[1];
        expect(child.tagName).toMatch('P');
        expect(child.textContent).toMatch(task.description);
      });
      it('task should have delete button element as third child', () => {
        const child = taskElementData.children[2];
        expect(child.tagName).toMatch('BUTTON');
        expect(child.textContent).toMatch('delete');
      });
      it('task should have edit button element as tforthird child', () => {
        const child = taskElementData.children[3];
        expect(child.tagName).toMatch('BUTTON');
        expect(child.textContent).toMatch('edit');
      });
      it('should add task to ls', async () => {
        const tasks = await page.evaluate(() =>
          JSON.parse(localStorage.getItem('tasks'))
        );
        expect(tasks).toEqual([
          { description: task.description, id: 1, name: task.name }
        ]);
      });
    });
    describe('should edit task', () => {
      const editedTask = {
        name: 'Edited Task',
        description: ':Edited'
      };
      beforeAll(async () => {
        await page.$eval('summary', summary => summary.click());
        await page.$eval('.btn-edit', btn => btn.click());
        await page.click('input[name=name]', { clickCount: 10 });
        await page.keyboard.press('Backspace');
        await page.type('input[name=name]', editedTask.name);
        await page.type('input[name=description]', editedTask.description);
        await page.$eval('.submit-btn', btn => btn.click());
      });
      it('taskElement should exist', async () => {
        const taskElementCheck = await page.evaluate(() =>
          document.querySelector('.task')
        );
        expect(taskElementCheck).toBeTruthy();
      });
      it("task section shouldn't have any children", async () => {
        const tasksSectionCount = await page.$eval(
          '.tasks-section',
          element => element.childElementCount
        );
        expect(tasksSectionCount).toBe(1);
      });
      it('should remove task from localStorage', async () => {
        const tasks = await page.evaluate(() =>
          JSON.parse(localStorage.getItem('tasks'))
        );
        expect(tasks).toEqual([
          {
            description: `${task.description}${editedTask.description}`,
            id: 1,
            name: editedTask.name
          }
        ]);
      });
    });
    describe('should delete task', () => {
      beforeAll(async () => {
        await page.$eval('summary', details => details.click());
        await page.$eval('.btn-delete', btn => btn.click());
      });

      it("taskElement shouldn't exist", async () => {
        const taskElementCheck = await page.evaluate(() =>
          document.querySelector('.task')
        );
        expect(taskElementCheck).toBeFalsy();
      });
      it("task section shouldn't have any children", async () => {
        const tasksSectionCount = await page.$eval(
          '.tasks-section',
          element => element.childElementCount
        );
        expect(tasksSectionCount).toBe(0);
      });
      it('should remove task from localStorage', async () => {
        const tasks = await page.evaluate(() =>
          JSON.parse(localStorage.getItem('tasks'))
        );
        expect(tasks).toEqual([]);
      });
    });
  });
});
