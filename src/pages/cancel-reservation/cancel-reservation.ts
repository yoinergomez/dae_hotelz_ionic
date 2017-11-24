import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, RequestOptions, Http } from '@angular/http';
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
  room: any =   {
    "token": "4asdas54qwe2121we",
    "hotelz_api_url":"http://services.groupkt.com/country/get/all",
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
          "room_thumbnail": "https://i.kinja-img.com/gawker-media/image/upload/s--8QTB8BSU--/c_scale,fl_progressive,q_80,w_800/ynclxch3hp6svpu2sv1z.jpg",
          "description": "Officia consectetur deserunt laborum elit velit velit excepteur laboris pariatur labore labore nisi ipsum. Et esse eiusmod nulla ad elit et fugiat nostrud aute ut. Officia ullamco et Lorem pariatur laboris. Elit non id laboris aliquip proident reprehenderit veniam in cupidatat aute in sunt eu. Consectetur anim qui aliquip consequat. Consequat veniam ipsum Lorem consectetur ad enim pariatur magna magna excepteur fugiat officia exercitation veniam. Esse sit irure cillum sunt consequat ipsum dolor ex magna occaecat aute non occaecat culpa.\r\n",
          "beds": {
            "simple": 2,
            "double": 2
          }
        }
    }
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private alertCtrl: AlertController) {
    //this.room = this.navParams.get('reservation');
    if (this.room.reservation.state == "A"){
      this.isScheduled = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelReservationPage');
  }

  cancelReservation() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.room.token);
    let options = new RequestOptions({headers: headers});
    //let url = this.room.hotelz_api_url+'/v1/reservations?reserve_id='+this.room.reservation.reserve_id;
    this.http.get(this.room.hotelz_api_url, options).subscribe(
      (data) => {
        let response: any = data.json();
        let alert = this.alertCtrl.create({
          title: 'Hotelz :c',
          subTitle: response,
          buttons: ['Aceptar']
        });
        alert.present();
        console.log(data.status);
        console.log(response);
        console.log(data.headers);
      }, (error) => {
        let alert = this.alertCtrl.create({
          title: 'Hotelz',
          subTitle: "No se ha podido procesar la solicitud debido a un error interno.",
          buttons: ['Aceptar :c']
        });
        alert.present();
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
      });
  }
}
