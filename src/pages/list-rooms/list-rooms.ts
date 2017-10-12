import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Hotel, Rooms } from "../../interfaces/response.inteface";


@IonicPage()
@Component({
  selector: 'page-list-rooms',
  templateUrl: 'list-rooms.html',
})
export class ListRoomsPage {

  response:Hotel[] = []
  onlyRooms = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listOnlyRooms()
  }

  listOnlyRooms(){
    console.log("Hello World")
    for (let hotel in this.response) {
      let hotel2:any = hotel
      let rooms:any[] = hotel2.rooms
      for (let room in rooms) {
          console.log(room)
      }
    }
  }
}
