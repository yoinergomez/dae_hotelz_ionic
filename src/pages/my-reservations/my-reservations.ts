import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { API_SCALA_DEV, API_NODE_DEV } from '../../global'

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
  hotels_names = [API_SCALA_DEV, API_NODE_DEV]

  constructor(public navCtrl: NavController, public navParams: NavParams,  private _hotelzProvider: HotelzProvider) {
    
  }

  ionViewDidEnter() {
    this.myReservations = [];
    this.getReservations();
  }


  getReservations(){
    
    for (let hotel_name of this.hotels_names) {
      this._hotelzProvider.getAllReservations(hotel_name).then((response) => {
        console.log(response);
        
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
    hotelReservations = hotel_response.reservations
    for(let hotelReservation of hotelReservations){
      let hotelInfo:any = {};
      hotelInfo.hotel_name = hotelReservation.hotel_name
      hotelInfo.hotel_location= hotelReservation.hotel_location.address
      hotelInfo.hotel_api_url = hotel_response.hotel_api_url
      hotelInfo.check_in = hotelReservation.check_in
      hotelInfo.check_out = hotelReservation.check_out
      hotelInfo.hotel_thumbnail = hotelReservation.hotel_thumbnail
      let reservations = hotelReservation.reservation
      console.log(reservations);

      for(let reservation of reservations){
        let resInfo: any = {};
        resInfo = hotelInfo;
        resInfo.reservation = reservation;
        //console.log("Hola pase por aqui");
        /*let room = resInfo.reservation.room;
        /*switch(room.room_type){
          case "L":
          case "l":
            resInfo.room_type_str = 'Lujosa';
            break;
          case "S":
          case "s":
            resInfo.room_type_str = 'Sencilla';
            break;
        }
        console.log("Hola pase por aqui");
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
        }*/
        //resInfo.state_str = "Activa"
        
        
        //console.log(resInfo);
        console.log(resInfo.hotel_name, resInfo.hotel_location);
        
        this.myReservations.push(resInfo)
      }

      
    }
    //this.ordenar()

  }

  showDetail(reservation){
    
  }



}
