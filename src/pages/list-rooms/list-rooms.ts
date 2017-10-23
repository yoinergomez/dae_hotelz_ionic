import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';

@IonicPage()
@Component({
  selector: 'page-list-rooms',
  templateUrl: 'list-rooms.html',
})
export class ListRoomsPage {

  info: any;
  hotels_response: any = []
  onlyRooms = []
  hotels_names = ["https://udeain.herokuapp.com", "response-udeainn.json", "response-colombiaresort.json"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _hotelzProvider: HotelzProvider) {
    this.info = this.navParams.get("info")
    this.getRooms()
  }

  getRooms() {
    new Promise((resolve, reject)=>{
      for (let hotel_name of this.hotels_names) {
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
        room.hotel_name = hotel.hotel_name
        room.hotel_location= hotel.hotel_location.address
        if(room.room_type=='l'){
          room.room_type = "Lujosa"
        }else{
          room.room_type = "Secilla"
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
}
