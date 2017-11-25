import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelReservationPage } from './cancel-reservation';

@NgModule({
  declarations: [
    CancelReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelReservationPage),
  ],
})
export class CancelReservationPageModule {}
