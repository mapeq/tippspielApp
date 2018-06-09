import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandingPage } from './standing';

@NgModule({
  declarations: [
    StandingPage,
  ],
  imports: [
    IonicPageModule.forChild(StandingPage),
  ],
})
export class StandingPageModule {}
