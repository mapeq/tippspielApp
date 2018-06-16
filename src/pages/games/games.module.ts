import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamesPage } from './games';
import {OrderbyPipe}  from "../../pipes/orderby/orderby";


@NgModule({
  declarations: [
    GamesPage,OrderbyPipe,
  ],
  imports: [
    IonicPageModule.forChild(GamesPage),
  ],
})
export class GamesPageModule {}
