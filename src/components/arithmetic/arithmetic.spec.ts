import { async, TestBed } from '@angular/core/testing';

import { ArithmeticComponent } from './arithmetic';

describe('MyApp Component', () => {
    let fixture;
    let component;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ArithmeticComponent]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ArithmeticComponent);
      component = fixture.componentInstance;
      component = new ArithmeticComponent();
    });
  
    it('should be created', () => {
      expect(component instanceof ArithmeticComponent).toBe(true);
    });

    it('sum a and b', () => {
        let result = component.getSum(2,3);
        expect(result).toEqual(5);
    });
});