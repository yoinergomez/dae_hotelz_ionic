import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRoomsPage } from './list-rooms';

@NgModule({
  declarations: [
    ListRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListRoomsPage),
  ],
})
export class ListRoomsPageModule {}
