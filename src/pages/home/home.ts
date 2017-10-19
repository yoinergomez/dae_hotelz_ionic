import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { RequestSearchRooms } from "../../interfaces/request.interface";
import { ListRoomsPage } from "../list-rooms/list-rooms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  request: RequestSearchRooms;
  rooms: any = [];

  constructor(public navCtrl: NavController, private _hotelzProvider: HotelzProvider) {
    this.request = {} as RequestSearchRooms;
  }

  getRooms(event) {
    this._hotelzProvider.getAvalaibleRooms().then((response) => {
      let result: any = response
      this.navCtrl.push(ListRoomsPage, {response: result})
    })
  }

}
