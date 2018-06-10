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
  }

  ionViewWillEnter() {
    this.loadData();
  }


private  loadData(refresher?:any){
    this.games = undefined;
    let that = this;

    console.log(refresher);
      this.GameApi.getGamesWObet().subscribe(function (data) {
          that.games = data;
          if(refresher){
            refresher.complete();
          }
      });

  }

private  openGame(game:Tipp){
    this.navCtrl.push('BetPage',{'game': game  } );
  }

}
