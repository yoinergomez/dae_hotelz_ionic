import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})

export class ReservePage {

  room: any;
  person: any;
  submitted = false;
  name = true;
  
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.room = this.navParams.get('room');
    console.log(this.room);
  }
  /*slideTwoForm = this.formBuilder.group({
    username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
    privacy: ['', Validators.required],
    bio: ['']
});*/
}
