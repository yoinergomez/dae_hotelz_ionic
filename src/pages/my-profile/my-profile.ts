import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-profile",
  templateUrl: "my-profile.html"
})
export class MyProfilePage {
  formReserve: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private _authService: AuthServiceProvider
  ) {
    this.formReserve = this.formBuilder.group({
      name: [
        {value:"", disabled:true},
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(50),
          Validators.pattern("[a-zA-Z ]+")
        ]
      ],
      doc_type: [null, [Validators.required]],
      doc_id: [
        "",
        [Validators.required, Validators.minLength(7), Validators.maxLength(11)]
      ],
      email: [
        {value:"", disabled:true},
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyProfilePage");
  }

  login() {
    this._authService.loginWithGoogle().then(status => {
      console.log('status?');
      console.log(status);
      this._authService.getUserInformation().then(session => {
        console.log('session');
        console.log(session);
      });
    });
  }
}
