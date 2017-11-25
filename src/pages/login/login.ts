import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ViewChild, AfterViewInit } from "@angular/core";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage implements AfterViewInit {
  @ViewChild(Slides) slides: Slides;
  formReserve: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private _authService: AuthServiceProvider
  ) {
    this.formReserve = this.formBuilder.group({
      name: [
        {value:""},
        [Validators.required, Validators.minLength(7), Validators.maxLength(50)]
      ],
      doc_type: [null, [Validators.required]],
      doc_id: [
        "",
        [Validators.required, Validators.minLength(7), Validators.maxLength(11)]
      ],
      email: [
        {value:""},
        [
          Validators.required,
          Validators.email,
          Validators.minLength(7),
          Validators.maxLength(50)
        ]
      ],
      phone_number: [
        "",
        [
          Validators.required,
          Validators.pattern("[0-9]*"),
          Validators.minLength(7),
          Validators.maxLength(15)
        ]
      ]
    });
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }

  login() {
    this._authService.loginWithGoogle().then(status => {
      console.log("status?");
      console.log(status);
      this._authService.getCurrentSession().then((session: any) => {
        console.log("session");
        console.log(session.email);
        this.formReserve.patchValue({
          name: session.displayName,
          email: session.email
        });
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      });
    });
  }

  signIn() {
    this._authService
      .saveUserInformation(this.formReserve.value)
      .then(confirm => {
        if (confirm === true) {
          this.navCtrl.setRoot(TabsPage);
        }
      });
  }
}
