import { AutomotivePartsPage } from './app.po';

describe('automotive-parts App', () => {
  let page: AutomotivePartsPage;

  beforeEach(() => {
    page = new AutomotivePartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
