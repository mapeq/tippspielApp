
import { Injectable } from '@angular/core';
import { StatsService } from '../../api/stats.service';
import {UserService} from '../../api/user.service';
import { Storage } from '@ionic/storage';
import {LoginData} from '../../model/loginData';
import {Md5} from 'ts-md5/dist/md5';
import { NavController, NavParams, Events} from 'ionic-angular';

/*
  Generated class for the EndpointProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EndpointProvider {

  constructor(public broadcast:Events, private statsApi: StatsService, private userApi:UserService, public storage: Storage) {
      console.log('endpoint geladen');
  }

  public getUser():Promise<LoginData> {
    let that = this;

      return new Promise((resolve, reject) => {

        this.storage.get("user").then(login =>{


          if(login != undefined){
            login.passphrase = that.createPasshrase(login);
          }
              resolve(login);
        });
      });
  }


  private createPasshrase(loginData:LoginData):string{
  //    Md5.hashStr(loginData.TOKEN + loginData.PW);
//that.broadcast.publish("SETTINGS_CHANGED");
    console.log('create PP');
        return loginData.PW;
      }


  private pushLoginPage(){
     this.broadcast.publish('LOGOUT');

  }

  login(login:LoginData):Promise<boolean> {

    var that = this;
      return new Promise((resolve, reject) => {

    this.userApi.login(login.EMAIL, 'PUT', login.PW).subscribe(function (data) {
        let ok: boolean = false;
        if(data.length > 0){
            let user:LoginData = data[0];

            if(user.LOGIN){
              user.PW = login.PW;
              user.PASSPHRASE = that.createPasshrase(user);

              that.storage.set("user", user).then(ok =>{
                  resolve(true);
              }).catch(err =>{  resolve(false);});
            }else{
                resolve(false);
            }

        }else{
            resolve(false);
        }

    }, function (err) {
      resolve(false);
    }

  );

    });

  }


  public logout(push:boolean = true){
    let that = this;
    this.getUser().then(user =>{

        if(user != undefined){

          user.LOGIN = false;
          user.PW = '';
          user.PASSPHRASE = '';
          user.ERROR_CODE = '';
          user.TOKEN = '';

          that.storage.set('user', user).then(ok =>{
          if(push){  that.pushLoginPage();}

          });

        }else{
          if(push){that.pushLoginPage();}
        }
    });
  }



  public checkLogin(push?:boolean):Promise<LoginData> {
    let that = this;

      return new Promise((resolve, reject) => {

          that.getUser().then(user =>{

            if(user != undefined && user.PASSPHRASE != undefined && user.LOGIN){

                that.userApi.isLoggedIn(user.TOKEN, user.PASSPHRASE).subscribe(function (loggedIn) {
                      console.log(JSON.stringify(loggedIn));
                      if(loggedIn && loggedIn.length >0){
                        let  usr:LoginData = loggedIn[0]

                          if(usr.LOGIN){
                              resolve(usr);
                          }else{
                            that.logout(push);
                            reject(user);
                          }
                      }else{
                        that.logout(push);
                        reject(user);
                      }

                });
          }else{
            console.log('logout');
            that.logout(push);
            reject();
          }


      });
    });

}

}
