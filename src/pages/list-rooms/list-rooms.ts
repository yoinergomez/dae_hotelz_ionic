import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-list-rooms',
  templateUrl: 'list-rooms.html',
})
export class ListRoomsPage {

  info: any;
  hotels_response: any = []
  onlyRooms = []
  //hotels_names = ["https://udeain.herokuapp.com/api/v1/rooms", "https://hotelz-python-api.herokuapp.com/V1/rooms/"]
  hotels_names = ["https://dezameron-api-dae.herokuapp.com/v1/rooms", "https://hotelz-python-api.herokuapp.com/V1/rooms/","https://api-hotelz-node.herokuapp.com/v1/rooms"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _hotelzProvider: HotelzProvider) {
    this.info = this.navParams.get("info")
    this.getRooms()
  }

  getRooms() {
    new Promise((resolve, reject)=>{
      for (let hotel_name of this.hotels_names) {
        console.log(hotel_name);

        this._hotelzProvider.getAvalaibleRooms(hotel_name, this.info).then((response) => {

          this.hotels_response.push(response)
          this.createListRooms(response)
        })
      }
    });
  }

  createListRooms(hotel_response:any){
      let hotel = hotel_response
      for(let room of hotel.rooms){
        room.hotel_id = hotel.hotel_id
        room.hotel_name = hotel.hotel_name
        room.hotel_location= hotel.hotel_location.address
        room.hotel_url = hotel.id
        if(room.room_type=='l' || room.room_type=='L' ){
          room.room_type_str = 'Lujosa'
        }else{
          room.room_type_str = 'Sencilla'
        }
        this.onlyRooms.push(room)
      }
      this.ordenar()
  }


  ordenar(){
    this.onlyRooms.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
  }

  reserve(room) {
    this.navCtrl.push(DetailPage, {"room": room,"arrive_date":this.info.arrive_date,
    "leave_date":this.info.leave_date});
  }
}
