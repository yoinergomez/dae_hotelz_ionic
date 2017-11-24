import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MyReservationsPage } from '../my-reservations/my-reservations';
import { MyProfilePage } from '../my-profile/my-profile';
import { CancelReservationPage } from '../cancel-reservation/cancel-reservation';

@Component({
  templateUrl: 'tabs.html',
  entryComponents: [HomePage, MyProfilePage, MyReservationsPage]
})
export class TabsPage {

  tab1Root = HomePage;
  //tab2Root = MyReservationsPage;
  tab2Root = CancelReservationPage;
  tab3Root = MyProfilePage;

  constructor() {

  }
}
