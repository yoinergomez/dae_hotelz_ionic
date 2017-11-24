import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CancelReservationPage } from '../pages/cancel-reservation/cancel-reservation';
import { DetailPage } from '../pages/detail/detail';
import { HomePage } from '../pages/home/home';
import { ListRoomsPage } from '../pages/list-rooms/list-rooms';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MyReservationsPage } from '../pages/my-reservations/my-reservations';
import { ReservePage } from '../pages/reserve/reserve';
import { TabsPage } from '../pages/tabs/tabs';
import { HotelzProvider } from '../providers/hotelz/hotelz';
import { MyApp } from './app.component';
import { AppSettings } from './app.config';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListRoomsPage,
    ReservePage,
    DetailPage,
    MyProfilePage,
    MyReservationsPage,
    CancelReservationPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListRoomsPage,
    ReservePage,
    DetailPage,
    MyProfilePage,
    MyReservationsPage,
    CancelReservationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HotelzProvider,
    HttpModule,
    AngularFireAuth,
    AuthServiceProvider
  ]
})
export class AppModule {}
