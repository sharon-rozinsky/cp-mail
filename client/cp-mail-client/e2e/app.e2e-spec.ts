import { CpMailPage } from './app.po';

describe('cp-mail App', () => {
  let page: CpMailPage;

  beforeEach(() => {
    page = new CpMailPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
