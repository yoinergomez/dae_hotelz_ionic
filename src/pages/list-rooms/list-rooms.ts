import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from "../../providers/hotelz/hotelz";

@IonicPage()
@Component({
  selector: 'page-list-rooms',
  templateUrl: 'list-rooms.html',
})
export class ListRoomsPage {

  response: any
  onlyRooms = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.response = navParams.get('response');
    this.onlyRooms = this.response.rooms
    console.log(this.onlyRooms)
  }

}
