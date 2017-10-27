import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReservePage } from '../reserve/reserve';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  room: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.room = this.navParams.get('room');
  }

  reserve() {
    this.navCtrl.push(ReservePage, {"room": this.room,"arrive_date":this.navParams.get('arrive_date'),
    "leave_date":this.navParams.get('leave_date')});
  }
}
