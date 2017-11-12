import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyReservationsPage } from './my-reservations';

@NgModule({
  declarations: [
    MyReservationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyReservationsPage),
  ],
})
export class MyReservationsPageModule {}
