import { browser, element, by} from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Form search hotels', function(){
  var searchButton, arrive_date, departure_date;

  beforeEach(function() {
      //browser.get('/');
  });

  it('should validate disable search button', function() {
      searchButton = element(by.id('buscar'));
      expect(searchButton.getAttribute('disabled')).toBe('true');
  });

  it('should validate disable search button', function() {
        element(by.id('city-id')).click();
        browser.driver.sleep(1000);
        element(by.partialButtonText("Medellín")).click();
        browser.driver.sleep(1000);
        element(by.id('host-id')).click();
        browser.driver.sleep(1000);
        element(by.partialButtonText("5")).click();
        browser.driver.sleep(1000);
        element(by.id('room_type-id')).click();
        browser.driver.sleep(1000);
        element(by.partialButtonText("Sencilla")).click();
        browser.driver.sleep(1000);
        element(by.id('departure-id')).click();
        browser.driver.sleep(1000);
        element(by.cssContainingText('.button', 'Done')).click();
        browser.driver.sleep(1000);
        element(by.id("buscar")).click();
        browser.driver.sleep(2000);
        element(by.css(".thumbnail")).click();
        browser.driver.sleep(2000);
        element(by.id("reserve-id")).click();
        browser.driver.sleep(1000);
  });
});
