import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the ReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})

export class ReservePage {

  room: any;
  person: any;
  formReserve: FormGroup;
  responseSuccess: any;
  responseError: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,private _hotelzProvider: HotelzProvider,
    private  alertCtrl: AlertController) {
    this.room = this.navParams.get('room');
    this.formReserve = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(7) ,Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]],
      doc_type: [null, [Validators.required]],
      doc_id: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(50)]],
      phone_number: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(7), Validators.maxLength(15)]]
  });
  }



  /**Method called from the reserve button. It builds the json and it is sent to provider */
  reserve(event) {
    let reserveInfo= {
      "arrive_date":this.navParams.get('arrive_date'),
      "leave_date":this.navParams.get('leave_date'),
      "room_type":this.room.room_type,
      "capacity":this.room.capacity,
      "beds":this.room.beds,
      "hotel_id":this.room.hotel_id,
      "user":{
        "doc_type":this.formReserve.value.doc_type,
        "doc_id":this.formReserve.value.doc_id,
        "email":this.formReserve.value.email,
        "phone_number":this.formReserve.value.phone_number
      }
    };
    let hotel_url = this.room.hotel_url 
    this._hotelzProvider.doReserve(hotel_url,reserveInfo).then((response) => {
      this.responseSuccess= response;
      const alert = this.alertCtrl.create({
        title: '¡Reserva exitosa!',
        subTitle: 'Su código de reserva es: '+ this.responseSuccess.reservation_id ,
        buttons: [{
          text:'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }]
      });
      alert.present();

    })
    .catch((error)=>{
      const alert = this.alertCtrl.create({
        title: 'Error en la reserva',
        subTitle: 'La reserva no se pudó completar',
        buttons: [{
          text:'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }]
      });
      alert.present();
    })


  }

}
