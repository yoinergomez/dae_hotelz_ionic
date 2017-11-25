import { browser, element, by} from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Form search hotels', function(){
  var searchButton, arrive_date, departure_date, reserveButton;

  beforeEach(function() {
    //browser.get('/');
  });

  it('should validate disable search hotelz button', function() {
    searchButton = element(by.id('buscar'));
    expect(searchButton.getAttribute('disabled')).toBe('true');
  });

  it('should validate enable search hotelz button', function() {
    element(by.id('city-id')).click();
    browser.driver.sleep(1000);
    element(by.partialButtonText("Medellín")).click();
    browser.driver.sleep(1000);
    element(by.id('host-id')).click();
    browser.driver.sleep(1000);
    element(by.partialButtonText("3")).click();
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
    reserveButton = element(by.id("btn-reserve-id"));
    expect(reserveButton.getAttribute('disabled')).toBe('true');
  });

  it('should validate enable reserve button', function() {
    let name = element(by.id('name-id'));
    let document = element(by.id('document-id'));
    let email = element(by.id('email-id'));
    let phone = element(by.id('phone-id'));
    element(by.id('doc_type-id')).click();
    browser.driver.sleep(1000);
    element(by.partialButtonText("Cedula")).click();
    browser.driver.sleep(1000);
    browser.driver.actions().mouseDown(name).click().sendKeys("test de test testing").perform();
    browser.driver.actions().mouseDown(document).click().sendKeys("1111111111").perform();
    browser.driver.actions().mouseDown(email).click().sendKeys("test@test.com").perform();
    browser.driver.actions().mouseDown(phone).click().sendKeys("11111111").perform();
    browser.driver.sleep(1000);
    expect(reserveButton.getAttribute('disabled')).toBe(null);
  });
});
