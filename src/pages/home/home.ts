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
  listRooms: any;
  constructor(public navCtrl: NavController, private _hotelzProvider: HotelzProvider) {
    _hotelzProvider.getAvalaibleRooms().then((response)=>{
      this.rooms = response;
      console.log(this.rooms);
    });
    this.request = {} as RequestSearchRooms;
    this.listRooms = ListRoomsPage;
  }
}
