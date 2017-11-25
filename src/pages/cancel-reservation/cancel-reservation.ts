import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
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

  reservation: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _hotelzProvider: HotelzProvider, private  alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.reservation = this.navParams.get('reservation');
  }

  cancel() {
    let hotel_api_url = this.reservation.hotel_info.hotel_api_url
    this._hotelzProvider.doReserve(hotel_api_url, this.reservation.reserve_id).then((response) => {
      const alert = this.alertCtrl.create({
        title: 'Operación exitosa!',
        subTitle: 'Su reserva ha sido cancelada',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }]
      });
      alert.present();

    })
      .catch((error) => {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'La reserva no se ha podido cancelar. Intentelo más tarde',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot(HomePage)
            }
          }]
        });
        alert.present();
      })

  }
}
