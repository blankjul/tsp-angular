import { TspAngularPage } from './app.po';

describe('tspangular App', function() {
  let page: TspAngularPage;

  beforeEach(() => {
    page = new TspAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
