import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rooms: any = [];
  constructor(public navCtrl: NavController, private _hotelzProvider: HotelzProvider) {
    _hotelzProvider.getAvalaibleRooms().then((response)=>{
      this.rooms = response;
      console.log(this.rooms);
    });
  }
}
