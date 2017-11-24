import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';

/**
 * Generated class for the MyReservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-reservations',
  templateUrl: 'my-reservations.html',
})
export class MyReservationsPage {

  hotels_response: any = [];
  myReservations:any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private _hotelzProvider: HotelzProvider) {
    this.getReservations();
  }

  getReservations(){
    let hotel_name="prueba";
    this._hotelzProvider.getAllReservations(hotel_name).then((response) => {
      
      this.hotels_response.push(response);
      this.createListReservations(response);
    })
    .catch((error)=>{
    
    })
  }

  createListReservations(hotel_response:any){
    let hotel = hotel_response 
    let hotelReservations : any = []
    let room : any =[]; 
      
    hotelReservations = hotel.reservations
    
    for(let hotelReservation of hotelReservations){
      let resInfo:any = {};
      resInfo.hotel_name = hotelReservation.hotel_name
      resInfo.hotel_location= hotelReservation.hotel_location.address
      resInfo.hotel_api_url = hotel_response.hotel_api_url
      resInfo.check_in = hotelReservation.check_in
      resInfo.check_out = hotelReservation.check_out
      let reservations = hotelReservation.reservation
      
      for(let reservation of reservations){
        resInfo.reservation = reservation;
        room = reservation.room

        if(room.room_type=='l' || room.room_type=='L' ){
          resInfo.room_type_str = 'Lujosa'
        }else{
          resInfo.room_type_str = 'Sencilla'
        }
      }
      this.myReservations.push(resInfo)
    }
    //this.ordenar()

  }

  showDetail(reservation){
    
  }



}
