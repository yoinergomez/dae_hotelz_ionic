import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RequestSearchRooms } from "../../interfaces/request.interface";
import { ListRoomsPage } from "../list-rooms/list-rooms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  request: RequestSearchRooms;
  rooms: any = [];

  constructor(public navCtrl: NavController) {
    this.request = {} as RequestSearchRooms;
  }

  getRooms(evento) {
    this.navCtrl.push(ListRoomsPage);
  }


}
