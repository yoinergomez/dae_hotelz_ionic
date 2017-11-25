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
    let promise = new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        hd: "udea.edu.co"
      });

      this.afAuth.auth.signInWithPopup(provider).then(data => {
        console.log(data.user.h.b); // Token para validar en el servidor
        this.saveUserInformation(data.user).then(confirm => {
          resolve(confirm);
        });
        /* this.formReserve.patchValue({
          'name': data.user.displayName,
          'email': data.user.email
        }); */
      });
    });
    return promise;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  private saveUserInformation(data: any) {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.set("session", JSON.stringify(data));
        resolve(true);
      } else {
        // Desktop
        if (data) {
          localStorage.setItem("session", JSON.stringify(data));
          resolve(true);
        } else {
          localStorage.removeItem("session");
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
          this.storage.get("session").then(userInformation => {
            resolve(userInformation);
          });
        });
      } else {
        // Desktop
        resolve(localStorage.getItem("session"));
      }
      resolve(null);
    });
    return promise;
  }
}
