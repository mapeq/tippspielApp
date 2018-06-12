import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Events, AlertController, Select, MenuController, LoadingController, Loading,
        ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoginData} from '../../model/loginData';
import {UserService} from '../../api/user.service';
import {HomePage} from '../home/home';
import {Md5} from 'ts-md5/dist/md5';
import {EndpointProvider} from '../../providers/endpoint/endpoint';


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
    loading: Loading;
    private  loginData: LoginData;
    autoLoginAttemp: boolean = true ;
    self:Login
    private email:string = '';
    private pw:string = '';




  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
             public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController,private userService:UserService,
               private toastCtrl: ToastController, private endpoint: EndpointProvider, public broadcast:Events

             ) {

                this.loginData = {"EMAIL": "","PW": ""};




          this.loginForm = formBuilder.group(
            {
            //    userName: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8),Validators.pattern('[a-zA-Z ]{6}[0-9]{2}'),  Validators.required])],

                userName: ['', Validators.compose([ Validators.required])],
                password: ['', Validators.compose([ Validators.required])],


            }
          );

      //    this.loginForm.setValue([{'userName': this.email}, {'paasword': this.email}] );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

ionViewWillEnter(){
    this.checkLogin();
}


private checkLogin(){
  let that = this;

  this.menuCtrl.enable(false);

console.log('Login: checkLogin');

this.endpoint.isLoggedIn(true).then( ok => {

  if(ok){
    console.log('eingeloggt...');
    that.menuCtrl.enable(true)
    that.switchRootPage();
  }else{

      this.endpoint.getUser().then(user =>{
          if(user){

              that.loginForm.get('userName').setValue(user.EMAIL);
          }
      });

  }

}).catch(err=>{});

}
logout(){

    this.endpoint.logout();
//  this.menuCtrl.enable(true);
//  this.navCtrl.setRoot(LoginPage);
}

login() :boolean {
  this.showLoading();

  var that = this;

  this.loginData.EMAIL = this.loginForm.get("userName").value;
  this.loginData.PW = this.loginForm.get("password").value;
  this.loginData.PW = String(Md5.hashStr(this.loginData.PW));

  this.endpoint.login(this.loginData).then(ok => {
      that.hideLoading();
      if(ok){
        that.menuCtrl.enable(true)
        that.switchRootPage();
      }else{
        that.showToast("Benutzername oder Passwort nicht korrekt!");
      }

  });
  return true;
}
/*
  login() :boolean {
    this.showLoading();

    var that = this;

    this.loginData.EMAIL = this.loginForm.get("userName").value;
    this.loginData.PW = this.loginForm.get("password").value;
    this.loginData.PW = String(Md5.hashStr(this.loginData.PW));

    this.userService.login(this.loginData.EMAIL, 'PUT', this.loginData.PW).subscribe(function (data) {
        let ok: boolean = false;
        if(data.length > 0){
            let user:LoginData = data[0];

            if(user.LOGIN){
              user.PW = that.loginData.PW;
              that.storage.set("user", user).then(ok =>{
                that.menuCtrl.enable(true)
                  that.switchRootPage();
              });
            }


        }
        that.hideLoading();
    });
    return true;
  }
*/
  showMessage(title, text) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: ['OK']
		});
//		alert.present(prompt);
	}


  public cancel(){

  //  this.currentUser = undefined;
  //  this.depots= [];

  //  this.userService.logoutUser();
  }

  switchRootPage(){
    this.navCtrl.setRoot(HomePage);
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
