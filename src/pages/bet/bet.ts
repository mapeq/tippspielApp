import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Loading} from 'ionic-angular';
import {Tipp} from '../../model/tipp';
import {TippService} from '../../api/tipp.service';
import {EndpointProvider} from '../../providers/endpoint/endpoint';

/**
 * Generated class for the BetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bet',
  templateUrl: 'bet.html',
})
export class BetPage {

  private game:Tipp;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private endpoint: EndpointProvider, private tippApi:TippService,
  public loadingCtrl: LoadingController) {
    this.game = {"BEZEICHNUNG": ""};
  }

  ionViewWillEnter() {

    this.endpoint.checkLogin(true).then(check =>{

    this.game =  this.navParams.get('game');

    if(this.game != undefined){
      this.game.TIPPTORE1 = 0;
      this.game.TIPPTORE2 = 0;
    }else{
      this.navCtrl.setRoot('GamesPage');
    }

  }).catch(err => {});

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

  private submitBet(){
      this.showLoading();
      let that = this;
      let tipps:Array<Tipp> = new Array<Tipp>(this.game);

      this.endpoint.checkLogin().then(user => {

          that.tippApi.addBet(user.TOKEN,  JSON.stringify(tipps), user.PASSPHRASE).subscribe(function (ok) {
                that.hideLoading();
                that.navCtrl.pop();
          })

      });


  }

}
