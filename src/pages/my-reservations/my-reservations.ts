import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { API_SCALA_DEV } from '../../global'

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
  hotels_names = [ API_SCALA_DEV]

  constructor(public navCtrl: NavController, public navParams: NavParams,  private _hotelzProvider: HotelzProvider) {
    
  }

  ionViewDidEnter() {
    this.getReservations();
  }


  getReservations(){
    
    for (let hotel_name of this.hotels_names) {
      this._hotelzProvider.getAllReservations(hotel_name).then((response) => {
        
        this.hotels_response.push(response);
        this.createListReservations(response);
      })
      .catch((error)=>{
      
      })
    }
    
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
        switch(room.room_type){
          case "L":
          case "l":
            resInfo.room_type_str = 'Lujosa';
            break;
          case "S":
          case "s":
            resInfo.room_type_str = 'Sencilla';
            break;
        }
        switch(resInfo.reservation.state){
          case "A": 
            resInfo.state_str = "Activa";
            break;
          case "C":
            resInfo.state_str = "Cancelada";
            break;
          case "D":
            resInfo.state_str = "Expirada";
            break;
          default:
            resInfo.state_str = "Activa";
        }
        this.myReservations.push(resInfo)
      }

      
    }
    //this.ordenar()

  }

  showDetail(reservation){
    
  }



}
