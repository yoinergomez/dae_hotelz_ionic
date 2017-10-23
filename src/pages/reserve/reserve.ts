import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {

  room: any;
  person: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.room = this.navParams.get('room');
    console.log(this.room);
  }

}
