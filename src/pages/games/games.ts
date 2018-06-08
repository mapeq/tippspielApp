import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GameService} from '../../api/game.service';
import {Tipp} from '../../model/tipp';

/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {

  private games: Array<Tipp>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private GameApi:GameService) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
  }


  loadData(refresher?:any){
    let that = this;

    console.log(refresher);
      this.GameApi.getGames().subscribe(function (data) {
          that.games = data;
          if(refresher){
            refresher.complete();
          }
      });

  }

  openGame(game:Tipp){
    console.log('game' + JSON.stringify(game))
    this.navCtrl.push('BetPage',{'game': game  } );
  }

}
