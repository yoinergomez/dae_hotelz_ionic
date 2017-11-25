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
        this.saveSession(data.user).then(confirm => {
          resolve(confirm);
        });
      });
    });
    return promise;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  private saveSession(data: any) {
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

  saveUserInformation(data: any) {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.set("user", JSON.stringify(data));
        resolve(true);
      } else {
        // Desktop
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          resolve(true);
        } else {
          localStorage.removeItem("user");
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
          this.storage.get("user").then(userInformation => {
            resolve(userInformation);
          });
        });
      } else {
        // Desktop
        resolve(JSON.parse(localStorage.getItem("user")));
      }
      resolve(null);
    });
    return promise;
  }

  getCurrentSession() {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready().then(() => {
          this.storage.get("session").then(userInformation => {
            resolve(userInformation);
          });
        });
      } else {
        // Desktop
        resolve(JSON.parse(localStorage.getItem("session")));
      }
      resolve(null);
    });
    return promise;
  }
}
