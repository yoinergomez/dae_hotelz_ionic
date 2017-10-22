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

  hotels_names = ["response-dezameron.json", "response-udeainn.json", "response-colombiaresort.json"]


  constructor(public navCtrl: NavController, private _hotelzProvider: HotelzProvider) {
    this.request = {} as RequestSearchRooms;
  }

  getRooms(event) {
    let result: any[] = []
    new Promise((resolve, reject)=>{
      for (let hotel_name of this.hotels_names) {
        this._hotelzProvider.getAvalaibleRooms(hotel_name).then((response) => {
          result.push(response)
        })
      }
      this.navCtrl.push(ListRoomsPage, {response: result})
    });
  }

}
