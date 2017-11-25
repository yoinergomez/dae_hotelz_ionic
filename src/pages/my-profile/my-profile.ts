import { Component } from "@angular/core";
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  formUser: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private _authService: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.formUser = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(50)
        ]
      ],
      doc_type: [null, [Validators.required]],
      doc_id: [
        "",
        [Validators.required, Validators.minLength(7), Validators.maxLength(11)]
      ],
      email: [
        "",
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
    this._authService.getUserInformation().then((user: any) => {
      this.formUser.patchValue({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        doc_type: user.doc_type,
        doc_id: user.doc_id
      });
    });
  }

  updateUser() {
    this._authService.saveUserInformation(this.formUser.value).then(confirm => {
      if (confirm === true) {
        this.alertCtrl.create({
          title: 'Información actualizada',
          message: 'Su información ha sido guardada exitosamente',
          buttons:['Ok!']
        }).present();
      }
    });
  }
}
