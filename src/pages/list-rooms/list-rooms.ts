import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';

@IonicPage()
@Component({
  selector: 'page-list-rooms',
  templateUrl: 'list-rooms.html',
})
export class ListRoomsPage {

  hotels_response: any = []
  onlyRooms = []
  hotels_names = ["response-dezameron.json", "response-udeainn.json", "response-colombiaresort.json"]

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _hotelzProvider: HotelzProvider) {
    this.getRooms()
  }

  getRooms() {
    new Promise((resolve, reject)=>{
      for (let hotel_name of this.hotels_names) {
        this._hotelzProvider.getAvalaibleRooms(hotel_name).then((response) => {
          this.hotels_response.push(response)
          this.createListRooms(response)
        })
      }
    });
  }

  createListRooms(hotel_response:any){
      let hotel = hotel_response
      console.log("Hola mundo")
      for(let room of hotel.rooms){
        let newRoom = {
          hotel_name: hotel.hotel_name,
          hotel_location: hotel.hotel_location.address,
          room_type: room.room_type,
          price: room.price,
          room_thumbnail: room.room_thumbnail,
          currency: room.currency
        }
        this.onlyRooms.push(newRoom)
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
