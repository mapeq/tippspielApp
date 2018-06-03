import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Select, MenuController, LoadingController, Loading,
        ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../../model/User';
import {LoginData} from '../../model/LoginData';
import {Depot} from '../../model/Depot';
//import {TabsPage} from '../../pages/tabs/tabs';
import {UserService} from '../../providers/user-service';
import { Storage } from '@ionic/storage';
import {Kwe} from '../../pages/kwe/kwe';
import {Rwe} from '../../pages/rwe/rwe';
import {InfoPage} from '../../pages/info/info';
//import {EndpointProvider} from '../../providers/endpoint/endpoint';


/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  @ViewChild('select1') select: Select;
    loginForm: FormGroup;
    currentUser: User;
    depots: Array<Depot>;
    selectedDG: any;
    loading: Loading;
    private  loginData: LoginData;
    autoLoginAttemp: boolean = true ;





  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
              private userService: UserService, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController,
               private toastCtrl: ToastController//, private endpoint: EndpointProvider
               //public userApi: UserApi,
             ) {

    this.loginData = {"username": "","password": ""};


      this.loginForm = formBuilder.group(
        {
            userName: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8),Validators.pattern('[a-zA-Z ]{6}[0-9]{2}'),  Validators.required])],
            password: ['', Validators.compose([ Validators.required])],
            selectedDepot: ['']

        }
      );


  }

ionViewWillEnter(){
    this.checkLogin();
}

ionViewDidLoad() {
  console.log('ionViewDidLoad Login');
}

public showInfo(){
     this.userService.autologin = false;
     this.navCtrl.push(InfoPage);
}

private checkLogin(){
  let that = this;
console.log('checkLogin');


this.userService.isLoginP().then(loggedIn => {
  if(loggedIn){
    console.log('eingeloggt...');
    that.switchRootPage();
  }else{

    console.log('nicht eingeloggt auto: ' + that.userService.autologin);
    if(that.userService.autologin){
        that.autoLoginAttemp = true;

          that.login();

    }
  }
}).catch(err=> { console.log(err)});

/*
  this.userService.isLogin().subscribe(function(data){
          if(data){
            //  that.navCtrl.setRoot(TabsPage);
            that.switchRootPage();

          }else{

            if(that.userService.autologin){
                that.autoLoginAttemp = true;

                  that.login();

            //    that.endpoint.getIP().then(ipAdr =>{});

            }


          }

  });
*/


  this.menuCtrl.enable(false);
  this.loginForm.get('selectedDepot').setValidators(Validators.compose([]));

}

  login() :boolean {
    this.showLoading();

    var that = this;

    this.loginData.username = this.loginForm.get("userName").value;
    this.loginData.password = this.loginForm.get("password").value;

      this.userService.loginUser(this.loginData).subscribe(function(data){
              that.depots = data;



              if(that.depots.length == 1) {

                  setTimeout( function(){

                  that.hideLoading();
                  that.selectDepot(that.depots[0]);

                },200);

              }else{

                  setTimeout( function(){

                    that.userService.getUser().subscribe( function(data){

                        if(data != undefined){
                          that.currentUser = data;
                              console.log('vorname:' + that.currentUser.firstName);
                              that.loginForm.get('selectedDepot').setValidators(Validators.compose([Validators.required]));

                              setTimeout(function(){
                                  that.hideLoading();

                                  if(that.depots == undefined || that.depots.length == 0 ) {
                                    that.userService.logoutUser();
                                  }

                                  if(that.select != undefined){
                                  that.select.open();
                                }else{
                                //  that.cancel();
                                }



                              },200);
                        }else{
                            that.currentUser = undefined;
                               that.hideLoading();
                              if(that.autoLoginAttemp){
                                  that.showToast("Eine automatische Anmeldung war nicht möglich. Bitte Anmeldung mit Benutzernamen und Passwort fortsetzten.");
                              }else{
                            	   that.showMessage("Loginfehler", "Benutzername und/oder Passwort ist nicht korret!" );
                               }
                        }

                        that.autoLoginAttemp = false;

                    }, function(){
                            that.hideLoading();
                        	   that.showMessage("Loginfehler", "Benutzername und/oder Passwort ist nicht korret!" );
                    }

                    );

                  },200);

            }

      },error => {
               that.hideLoading();
               that.showMessage("Loginfehler", "Benutzername und/oder Passwort ist nicht korret!" );
               that.autoLoginAttemp = false;

  		});

    return true;
  }

  showMessage(title, text) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}



  selectDepot(depot?: Depot){
    this.showLoading();

    let that = this;

    depot = depot == undefined ? this.loginForm.get("selectedDepot").value : depot;
      console.log('Auswahl:' + JSON.stringify( depot));

        this.userService.setDepot(depot).subscribe( function(data){
                    console.log('Auswahl: result');
                  if(data){
                        console.log('Auswahl: ok');

                        that.switchRootPage();
                    //  that.navCtrl.setRoot(TabsPage);
                  }else{
                    console.log('Auswahl: nok');
                    that.userService.logoutUser();
                  }

                  that.hideLoading();

        },  function(){ //error
          console.log('Auswahl: error');
          that.hideLoading();
          that.cancel();
        }
      );

  }


  public cancel(){

    this.currentUser = undefined;
    this.depots= [];

    this.userService.logoutUser();
  }

  switchRootPage(){
    if(new Date().getHours() < 12){
      this.navCtrl.setRoot(Rwe);
    }else{
      this.navCtrl.setRoot(Kwe);
    }
  }

  showLoading(){
      this.loading = this.loadingCtrl.create(
                {
                  content: 'Bitte warten',
                  spinner: 'bubbles'

                }

              );

      this.loading.present();
  }

  hideLoading(){
    this.loading.dismiss();
  }


  showToast(messageText: string) {
  let toast = this.toastCtrl.create({
    message: messageText,
    duration: 3000,
    showCloseButton: true,
    position: 'middle'
  });

  toast.present();
}


}
