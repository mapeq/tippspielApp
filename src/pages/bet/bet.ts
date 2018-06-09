import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Tipp} from '../../model/tipp';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.game = {"BEZEICHNUNG": ""};
  }

  ionViewWillEnter() {
    this.game =  this.navParams.get('game');
    if(this.game != undefined){
      this.game.TIPPTORE1 = 0;
      this.game.TIPPTORE2 = 0;
    }


  }

}
