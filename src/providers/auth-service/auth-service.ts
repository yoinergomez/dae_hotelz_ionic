import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  constructor(
    public afAuth: AngularFireAuth,
    private storage: Storage,
    private platform: Platform
  ) {}

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "udea.edu.co"
    });
    //return this.afAuth.auth.signInWithPopup(provider);
    this.afAuth.auth.signInWithPopup(provider).then(data => {
      // console.log(data);
      // console.log(data.user.displayName);
      // console.log(data.user.email);
      console.log(data.credential.idToken); // Este es el que se envía en las peticiones
      this.saveUserInformation(data);
      /* this.formReserve.patchValue({
        'name': data.user.displayName,
        'email': data.user.email
      }); */
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  saveUserInformation(data: any) {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.set("token", data.credential.idToken);
        resolve(true);
      } else {
        // Desktop
        if (data.credential.idToken) {
          localStorage.setItem("token", data.credential.idToken);
          resolve(true);
        } else {
          localStorage.removeItem("token");
          resolve(false);
        }
      }
      resolve(null);
    });
    return promise;
  }

  getUserInformation() {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready().then(() => {
          this.storage.get("token").then(token => {
            resolve(token);
          });
        });
      } else {
        // Desktop
        localStorage.get("token");
        resolve();
      }
      resolve(null);
    });
    return promise;
  }
}
