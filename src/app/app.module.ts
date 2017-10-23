import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListRoomsPage } from "../pages/list-rooms/list-rooms";
import { HotelzProvider } from '../providers/hotelz/hotelz';
import { ReservePage } from '../pages/reserve/reserve'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListRoomsPage,
    ReservePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListRoomsPage,
    ReservePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HotelzProvider,
    HttpModule
  ]
})
export class AppModule {}
