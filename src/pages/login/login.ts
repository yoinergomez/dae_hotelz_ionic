import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ViewChild, AfterViewInit } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides: Slides;
  formReserve: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.formReserve = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(7) ,Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]],
        doc_type: [null, [Validators.required]],
        doc_id: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(50)]],
        phone_number: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(7), Validators.maxLength(15)]]
    });
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }

  login(){

  }

  ingresar(){
    //Ir al home
  }



}
