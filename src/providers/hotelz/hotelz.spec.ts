import { async, TestBed } from '@angular/core/testing';
import { HotelzProvider } from './hotelz';

describe('Hotelz Provider', () => {
    let provider;

    beforeEach(() => {
      provider = new HotelzProvider(null);
    });

    it('should be created', () => {
      expect(provider instanceof HotelzProvider).toBe(true);
    });

    it('sould be string var undefined ', () => {
        let varUndefined;
        let result = provider.validateValue(varUndefined);
        expect(result).toEqual(true);
    });

    it('sould be string var defined ', () => {
      let varUndefined = 'test';
      let result = provider.validateValue(varUndefined);
      expect(result).toEqual(false);
    });

    it('sould be var integer undefined ', () => {
      let varDefined;
      let result = provider.validateInteger(varDefined);
      expect(result).toEqual(true);
    });

    it('sould be var integer defined ', () => {
      let varDefined = 12345;
      let result = provider.validateInteger(varDefined);
      expect(result).toEqual(false);
    });
});
