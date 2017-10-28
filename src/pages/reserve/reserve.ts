import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelzProvider } from '../../providers/hotelz/hotelz';
import { AlertController } from 'ionic-angular';

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
      name: [null, Validators.required],
      doc_type: [null, Validators.required],
      doc_id: [null, Validators.required],
      email: [null, Validators.required],
      phone_number: [null, Validators.required]
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
    let hotel_url = this.room.hotel_url +'/reserve'
    this._hotelzProvider.doReserve(hotel_url,reserveInfo).then((response) => {
      this.responseSuccess= response;
      const alert = this.alertCtrl.create({
        title: 'Reserva exitosa',
        subTitle: 'Su código de reserva es: '+ this.responseSuccess.reservation_id ,
        buttons: ['Ok']
      });
      alert.present();
      
    })
    .catch((error)=>{
      const alert = this.alertCtrl.create({
        title: 'Error en la reserva',
        subTitle: 'La reserva no se pudó completar',
        buttons: ['Ok']
      });
      alert.present();
    })
      
  }
    
}


