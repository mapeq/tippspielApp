import { Component, Inject, Optional } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Tipp} from '../../model/tipp';
import {EndpointProvider} from '../../providers/endpoint/endpoint';
import { BASE_PATH }  from '../../variables';


/**
 * Generated class for the AllBetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-bets',
  templateUrl: 'all-bets.html',
})
export class AllBetsPage {

  private games: Array<Tipp>;
  private selectedGame:Tipp;
  private bets: Array<Tipp>;
  private basePath:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private endpoint: EndpointProvider,@Inject(BASE_PATH) basePath: string) {
    this.basePath = basePath;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllBetsPage');
  }

  ionViewWillEnter() {
      this.loadData();
  }

  gameSelected(){
    this.bets = undefined;
    let that = this;

    this.endpoint.getAllBets(this.selectedGame.SPIEL_ID+"").then(data => {



        that.bets = data;


    });
  }

  getImageUrl(imageId:number){
  return   this.basePath +"/IMAGE/"+imageId+"/S/ ";
  }


  private  loadData(refresher?:any){
      this.games = undefined;
      let that = this;

      this.endpoint.getGamesApi().then(data => {
          that.games = data;
          if(data && data.length > 0){
            that.selectedGame = data[0];
            that.gameSelected();
          }
          if(refresher){
            refresher.complete();
          }

      });


    }

}
