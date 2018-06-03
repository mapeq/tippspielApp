import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Select, MenuController, LoadingController, Loading,
        ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoginData} from '../../model/loginData';
import {UserService} from '../../api/user.service';
import {HomePage} from '../home/home';
import {Md5} from 'ts-md5/dist/md5';



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
    selectedDG: any;
    loading: Loading;
    private  loginData: LoginData;
    autoLoginAttemp: boolean = true ;





  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
             public storage: Storage, public menuCtrl: MenuController, public loadingCtrl: LoadingController,private userService:UserService,
               private toastCtrl: ToastController

             ) {

    this.loginData = {"EMAIL": "","PW": ""};


      this.loginForm = formBuilder.group(
        {
        //    userName: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8),Validators.pattern('[a-zA-Z ]{6}[0-9]{2}'),  Validators.required])],
            userName: ['', Validators.compose([ Validators.required])],
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

/*
public showInfo(){
     this.userService.autologin = false;
     this.navCtrl.push(InfoPage);
}
*/

private checkLogin(){
  let that = this;
console.log('checkLogin');

this.menuCtrl.enable(false);

this.storage.get("user").then(login =>{
  let user:LoginData = login;

  if(user != undefined && user.LOGIN){
    console.log('eingeloggt...');
    that.menuCtrl.enable(true)
    that.switchRootPage();
  }


});


}

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
