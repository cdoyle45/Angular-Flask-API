import { AngularWithApiCallPage } from './app.po';

describe('angular-with-api-call App', function() {
  let page: AngularWithApiCallPage;

  beforeEach(() => {
    page = new AngularWithApiCallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
