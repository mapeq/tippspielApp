import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import {EndpointProvider} from '../providers/endpoint/endpoint';
import {LoginData} from '../model/loginData';
import { Inject, Optional }  from '@angular/core';
import { BASE_PATH }  from '../variables';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

//  rootPage: any = HomePage;
  rootPage: any = Login;


  private pages: Array<{title: string, component: any}>;
  private user:LoginData ;
  private test:string;
  private basePath:string;
  private imageUrl:string;
  private menuId:number = 0;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private endpoint: EndpointProvider,
   @Optional()@Inject(BASE_PATH) basePath: string, public broadcast:Events) {
    this.initializeApp();
    this.basePath = basePath +"IMAGE/{{user.image}}/S/";
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tipptabelle', component: 'StandingPage' },
      { title: 'Spiele', component: 'GamesPage' },
      { title: 'Meine Tipps', component: 'MybetsPage' },
      { title: 'Alle Tipps', component: 'AllBetsPage' }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.broadcast.subscribe('LOGOUT', logout =>{this.logoutView()});


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logoutView(){

    let view = this.nav.getActive();
      console.log(view);
      let ok:boolean = view.instance instanceof Login;
      console.log("change:"  + !ok );
      if ( !ok ){
            this.nav.setRoot(this.rootPage);
        }

  }

  logout(){
      this.endpoint.logout();
  }


  onIonOpen(){
    let that = this;
      this.endpoint.getUser().then(data =>{
          that.user = data;
      });
  }
}
