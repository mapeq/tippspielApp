
import { Injectable } from '@angular/core';
import { StatsService } from '../../api/stats.service';
import {UserService} from '../../api/user.service';
import { Storage } from '@ionic/storage';
import {LoginData} from '../../model/loginData';
import {Md5} from 'ts-md5/dist/md5';
import {Tipp} from '../../model/tipp';
import {GameService} from '../../api/game.service';
import { NavController, NavParams, Events} from 'ionic-angular';
import { Standing } from '../../model/standing';
import {TippService} from '../../api/tipp.service';



/*
  Generated class for the EndpointProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EndpointProvider {

  constructor(public broadcast:Events, private statsApi: StatsService, private userApi:UserService, public storage: Storage
  ,private gameApi:GameService,  private tippApi:TippService) {
      console.log('endpoint geladen');
  }


/*
that.tippApi.addBet(user.TOKEN,  JSON.stringify(tipps), user.PASSPHRASE).subscribe(function (ok) {
      that.hideLoading();
      that.navCtrl.pop();
})*/

/**
* GameApi
**/

public  getUserBet( ):Promise<Array<Tipp>>{
 let that = this;
    return new Promise((resolve, reject) => {
            that.getUser().then( user =>{

              that.tippApi.getUsersBets(user.USER_ID, user.TOKEN, user.PASSPHRASE,  'response').subscribe(function (response) {
                  if(response.ok){
                    resolve(response.body);
                  }else if(response.status == 403){
                    that.logout();
                  }
              }, function (err) {
                 that.logout();
              });

            }).catch(err => {that.logout()});

          });
}

public  getAllBets(gameId:string ):Promise<Array<Tipp>>{
 let that = this;
    return new Promise((resolve, reject) => {
            that.getUser().then( user =>{

              that.tippApi.getAllBets(gameId, user.PASSPHRASE,  'response').subscribe(function (response) {
                  if(response.ok){
                    resolve(response.body);
                  }else if(response.status == 403){
                    that.logout();
                  }
              }, function (err) {
                 that.logout();
              });

            }).catch(err => {that.logout()});

          });
}


public  getsubmitBetApi(tipp:Array<Tipp> ):Promise<Array<Tipp>>{
 let that = this;
    return new Promise((resolve, reject) => {
            that.getUser().then( user =>{

              that.tippApi.addBet(user.TOKEN,  JSON.stringify(tipp), user.PASSPHRASE,  'response').subscribe(function (response) {
                  if(response.ok){
                    resolve(response.body);
                  }else if(response.status == 403){
                    that.logout();
                  }
              }, function (err) {
                 that.logout();
              });

            }).catch(err => {that.logout()});

          });
}



/**
* GameApi
**/
public  getStandingApi():Promise<Array<Standing>>{
 let that = this;
    return new Promise((resolve, reject) => {
            that.getUser().then( login =>{

              that.statsApi.getStanding( 'response').subscribe(function (response) {
                  if(response.ok){
                    resolve(response.body);
                  }else if(response.status == 403){
                    that.logout();
                  }
              }, function (err) {
                 that.logout();
              });

            }).catch(err => {that.logout()});

          });
}



/**
* GameApi
**/
public  getGamesNoBetApi():Promise<Array<Tipp>>{
 let that = this;
    return new Promise((resolve, reject) => {
            that.getUser().then( login =>{

              that.gameApi.getGamesWObet(login.TOKEN, login.PASSPHRASE, 'response').subscribe(function (response) {

                  if(response.ok){
                    resolve(response.body);
                  }else if(response.status == 403){
                    that.logout();
                  }
              }, function (err) {
                 that.logout();
              });

            }).catch(err => {that.logout()});

          });
}

public  getGamesApi():Promise<Array<Tipp>>{
 let that = this;
    return new Promise((resolve, reject) => {
            that.getUser().then( login =>{

              that.gameApi.getGames( 'response').subscribe(function (response) {

                  if(response.ok){
                    resolve(response.body);
                  }else if(response.status == 403){
                    that.logout();
                  }
              }, function (err) {
                 that.logout();
              });

            }).catch(err => {that.logout()});

          });
}




  public getUser():Promise<LoginData> {
    let that = this;

      return new Promise((resolve, reject) => {

        this.storage.get("user").then(login =>{


          if(login != undefined){
            login.passphrase = that.createPasshrase(login);
          }
              resolve(login);


        }).catch(err => reject());


      });
  }

  public isLoggedIn(checkRemote:boolean = false):Promise<boolean>{
    let that = this;
        return new Promise((resolve, reject) => {
            that.getUser().then(user =>{
              if(user && user.LOGIN){
                if(checkRemote){
                    that.getLoginApi(user).then(remoteusr => {
                      resolve(remoteusr.LOGIN);
                    }).catch(err => {resolve(false)});
                }
                resolve(true);
              }else{
                resolve(false);
              }
            }).catch(err => resolve(false));
        });
  }


  public getLoginApi(user:LoginData):Promise<LoginData>{
    let that = this;

      return new Promise((resolve, reject) => {

        this.userApi.isLoggedIn(user.TOKEN, user.PASSPHRASE, 'response').subscribe(function (response) {

          if(response.ok){
            let usrArr = response.body;

              if(usrArr && usrArr.length >0){
                  resolve(usrArr[0]);
              }else{
                reject();
              }

          }else{
            reject();
          }

        }, function (err) {
              reject();
        }


      );

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
              user.EMAIL = login.EMAIL;

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


  public logout(){
    let that = this;
    this.getUser().then(user =>{

        if(user != undefined){

          user.LOGIN = false;
          user.PW = '';
          user.PASSPHRASE = '';
          user.ERROR_CODE = '';
          user.TOKEN = '';

          that.storage.set('user', user).then(ok =>{
              that.pushLoginPage();

            });

        }else{
          that.pushLoginPage();
        }
    });
  }


/*
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
*/
}
