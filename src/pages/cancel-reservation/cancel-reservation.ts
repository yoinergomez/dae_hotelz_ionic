import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, RequestOptions,  RequestMethod } from '@angular/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CancelReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancel-reservation',
  templateUrl: 'cancel-reservation.html',
})
export class CancelReservationPage {
  isScheduled: boolean = false;
  reservation:any;
  room: any =   {
    "hotel_name": "Sede Bogotá",
    "hotel_location": {
      "address": "556 Williams Avenue, Evergreen, Federated States Of Micronesia, 6771"
    },
    "check_in": "11:39",
    "check_out": "09:01",
    "reservation": {
        "state": "A",
        "reserve_id": "1234235",
        "arrive_date": "2017-02-05",
        "leave_date": "2017-02-06",
        "room": {
          "room_type": "lujosa",
          "capacity": 3,
          "price": "$53,908",
          "currency": "COP",
          "room_thumbnail": "https://media-cdn.tripadvisor.com/media/photo-s/08/cd/99/1a/hard-rock-hotel-ibiza.jpg",
          "description": "Officia consectetur deserunt laborum elit velit velit excepteur laboris pariatur labore labore nisi ipsum. Et esse eiusmod nulla ad elit et fugiat nostrud aute ut. Officia ullamco et Lorem pariatur laboris. Elit non id laboris aliquip proident reprehenderit veniam in cupidatat aute in sunt eu. Consectetur anim qui aliquip consequat. Consequat veniam ipsum Lorem consectetur ad enim pariatur magna magna excepteur fugiat officia exercitation veniam. Esse sit irure cillum sunt consequat ipsum dolor ex magna occaecat aute non occaecat culpa.\r\n",
          "beds": {
            "simple": 2,
            "double": 2
          }
        }
    }
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    //this.reservation = this.navParams.get('reservation');
    if (this.room.reservation.state == "A"){
      this.isScheduled = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelReservationPage');
  }
  cancelReservation(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + "3213asd321aasdwqe5123");
    //let options = new RequestOptions({ headers: headers });
    //this.http.get("url", options).map(response => response)
    let options = new RequestOptions({
      url: 'https://google.com',
      headers: headers
    });
    let alert = this.alertCtrl.create({
      title: 'Hotelz  :c',
      subTitle: 'Su reserva ha sido cancelada exitosamente!',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
