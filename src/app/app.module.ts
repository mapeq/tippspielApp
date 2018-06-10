import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApiModule} from '../api.module';
import { IonicStorageModule } from '@ionic/storage';
import { EndpointProvider } from '../providers/endpoint/endpoint';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ApiModule,
    IonicStorageModule.forRoot()


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  //  {provide: BASE_PATH, useValue: 'http://192.168.0.199/tippspielDB'},
  {provide: BASE_PATH, useValue: 'https://db.mapeq.de/tippspielDB/'},
    EndpointProvider
  ]
})
export class AppModule {}
