import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Tipp} from '../../model/tipp';
import {EndpointProvider} from '../../providers/endpoint/endpoint';
/**
 * Generated class for the MybetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mybets',
  templateUrl: 'mybets.html',
})
export class MybetsPage {

  private games: Array<Tipp>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private endpoint: EndpointProvider) {
  }

  ionViewWillEnter() {
      this.loadData();
  }


private  loadData(refresher?:any){
    this.games = undefined;
    let that = this;

    this.endpoint.getUserBet().then(data => {
        that.games = data;
        
        if(refresher){
          refresher.complete();
        }

    });


  }

}
