import { Component } from '@angular/core';

/**
 * Generated class for the ArithmeticComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'arithmetic',
  templateUrl: 'arithmetic.html'
})
export class ArithmeticComponent {

  text: string;

  constructor() {
    console.log('Hello ArithmeticComponent Component');
    this.text = 'Hello World';
  }

  getSum(a: number, b: number) {
    return a+b;
  }

}
