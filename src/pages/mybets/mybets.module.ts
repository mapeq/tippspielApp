import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybetsPage } from './mybets';

@NgModule({
  declarations: [
    MybetsPage,
  ],
  imports: [
    IonicPageModule.forChild(MybetsPage),
  ],
})
export class MybetsPageModule {}
