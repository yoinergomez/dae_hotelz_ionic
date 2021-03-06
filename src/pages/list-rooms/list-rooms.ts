import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { DetailPage } from '../detail/detail';
import { API_GO, API_NODE, API_SCALA, API_PYTHON } from '../../global'
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-list-rooms',
  templateUrl: 'list-rooms.html',
})
export class ListRoomsPage {

  info: any;
  hotels_response: any = []
  onlyRooms = []

  hotels_names = [API_NODE, API_PYTHON, API_GO, API_SCALA]

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _hotelzProvider: HotelzProvider, private  alertCtrl: AlertController) {
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
        .catch((error)=>{
          const alert = this.alertCtrl.create({
          title: 'Error de búsqueda',
          subTitle: 'La fecha de ingreso debe ser menor que la de salida',
          buttons: [{
            text:'Ok',
            handler: () => {
              this.navCtrl.push(HomePage)
            }
          }]
        });
        alert.present();
        
        })
        break;
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
        room.hotel_website = hotel.hotel_website
        room.check_in = hotel.check_in
        room.check_out = hotel.check_out
        room.hotel_thumbnail = hotel.hotel_thumbnail

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
