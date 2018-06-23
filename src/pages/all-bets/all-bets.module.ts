import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBetsPage } from './all-bets';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    AllBetsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBetsPage),PipesModule
  ],
})
export class AllBetsPageModule {}
