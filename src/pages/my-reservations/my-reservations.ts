import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { API_SCALA_DEV, API_NODE_DEV } from '../../global'
import { CancelReservationPage } from '../cancel-reservation/cancel-reservation';

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
  myReservations: any = [];
  hotels_names = [API_SCALA_DEV, API_NODE_DEV]

  constructor(public navCtrl: NavController, public navParams: NavParams, private _hotelzProvider: HotelzProvider) {

  }

  ionViewDidEnter() {
    this.myReservations.length = 0;
    this.getReservations();
  }


  getReservations() {

    for (let hotel_name of this.hotels_names) {
      this._hotelzProvider.getAllReservations(hotel_name).then((response) => {

        this.createListReservations(response);
      })
        .catch((error) => {

        })
    }
  }

  createListReservations(hotel_response: any) {
    let hotel = hotel_response
    let hotelReservations: any = []
    hotelReservations = hotel_response.reservations
    for (let hotelReservation of hotelReservations) {
      let hotelInfo: any = {};
      hotelInfo.hotel_name = hotelReservation.hotel_name
      hotelInfo.hotel_location = hotelReservation.hotel_location.address
      hotelInfo.hotel_api_url = hotel_response.hotel_api_url
      hotelInfo.check_in = hotelReservation.check_in
      hotelInfo.check_out = hotelReservation.check_out
      hotelInfo.hotel_thumbnail = hotelReservation.hotel_thumbnail
      let reservations = hotelReservation.reservation

      for (let reservation of reservations) {
        let resInfo: any = {};
        reservation.hotel_info = hotelInfo;

        let room = reservation.room;
        switch (room.room_type) {
          case "L":
          case "l":
            reservation.room_type_str = 'Lujosa';
            break;
          case "S":
          case "s":
            reservation.room_type_str = 'Sencilla';
            break;
        }
        switch (reservation.state) {
          case "A":
            reservation.state_str = "Activa";
            break;
          case "C":
            reservation.state_str = "Cancelada";
            break;
          case "D":
            reservation.state_str = "Expirada";
            break;
          default:
            reservation.state_str = "Activa";
        }

        this.myReservations.push(reservation)
      }


    }
    //this.ordenar()

  }

  showDetail(reservation) {
    console.log(reservation);
    
    this.navCtrl.push(CancelReservationPage, {"reservation": reservation});
  }



}
