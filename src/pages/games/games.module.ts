import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamesPage } from './games';
//import {OrderbyPipe}  from "../../pipes/orderby/orderby";
import {PipesModule} from '../../pipes/pipes.module';
//import {SortPipe}  from "../../pipes/sort/sort";


@NgModule({
  declarations: [
    GamesPage//,OrderbyPipe,
  ],
  imports: [
    IonicPageModule.forChild(GamesPage),PipesModule
  ],
})
export class GamesPageModule {}
