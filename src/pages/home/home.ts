import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { ListRoomsPage } from "../list-rooms/list-rooms";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rooms: any = [];
  formSearchRooms: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private _hotelzProvider: HotelzProvider) {
    this.formSearchRooms = this.formBuilder.group({
      arrive_date: [null, Validators.required],
      leave_date: [null, Validators.required],
      city: [null, Validators.required],
      hosts: [null, Validators.required],
      room_type: [null, Validators.required]
    });
  }

  getRooms(event) {
    this._hotelzProvider.getAvalaibleRooms().then((response) => {
      console.log(this.formSearchRooms.value)
      let result: any = response
      this.navCtrl.push(ListRoomsPage, {response: result})
    })
  }

}
