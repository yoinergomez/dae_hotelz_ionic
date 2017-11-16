import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListRoomsPage } from "../list-rooms/list-rooms";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  rooms: any = [];
  formSearchRooms: FormGroup;
  arrive_date: string;
  min_leave_date: string;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.arrive_date =  moment().format('YYYY-MM-DD');
    this.changeMinLeaveDate();

    this.formSearchRooms = this.formBuilder.group({
      arrive_date: [null, Validators.required],
      leave_date: [null, Validators.required],
      city: [null, Validators.required],
      hosts: [null, Validators.required],
      room_type: [null, Validators.required]
    });
  }

  getRooms(event) {
    this.navCtrl.push(ListRoomsPage, {"info": this.formSearchRooms.value})
  }

  changeMinLeaveDate() {
    this.min_leave_date = moment(this.arrive_date).add('days',1).format('YYYY-MM-DD');
    if (this.formSearchRooms && this.formSearchRooms.get('leave_date').value!=null) {
      this.formSearchRooms.patchValue({'leave_date': this.min_leave_date});
    }
  }

}
