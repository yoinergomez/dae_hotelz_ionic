import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RequestSearchRooms } from "../../interfaces/request.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  request: RequestSearchRooms;

  constructor(public navCtrl: NavController) {
    this.request = {} as RequestSearchRooms;
  }

}
