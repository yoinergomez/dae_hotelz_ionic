import { browser} from 'protractor';
import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new Page();
    browser.get('');
  });

  describe('default screen Hotelz', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a title saying Hotelz', () => {
      page.getTitle().then(title => {
        expect(title).toEqual('Hotelz');
      });
    });
  })

});
