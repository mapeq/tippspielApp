import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybetsPage } from './mybets';
//import {OrderbyPipe}  from "../../pipes/orderby/orderby";
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MybetsPage//,OrderbyPipe,
  ],
  imports: [
    IonicPageModule.forChild(MybetsPage),PipesModule
  ],
})
export class MybetsPageModule {}
