import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import {} from "jasmine";

import { TabsPage } from "../pages/tabs/tabs";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _authService: AuthServiceProvider
  ) {
    platform.ready().then(() => {


      this._authService.getUserInformation().then((user: any) => {
        if (user) {
          this.rootPage = TabsPage;
        }else{
          this.rootPage = "LoginPage";
        }
        statusBar.styleDefault();
        splashScreen.hide();
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }
}
