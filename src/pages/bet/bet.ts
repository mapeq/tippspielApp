import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Loading} from 'ionic-angular';
import {Tipp} from '../../model/tipp';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private endpoint: EndpointProvider,
  public loadingCtrl: LoadingController) {
    this.game = {"BEZEICHNUNG": ""};
  }

  ionViewWillEnter() {

    this.game =  this.navParams.get('game');

    if(this.game != undefined){
      this.game.TIPPTORE1 = 0;
      this.game.TIPPTORE2 = 0;
    }else{
      this.navCtrl.setRoot('GamesPage');
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

  private submitBet(){
      this.showLoading();
      let that = this;
      let tipps:Array<Tipp> = new Array<Tipp>(this.game);

      this.endpoint.getsubmitBetApi(tipps).then(tipp => {
          that.hideLoading();
          that.navCtrl.pop();
      }).catch(err =>{
        that.hideLoading();
        that.navCtrl.pop();

      });



  }

}
