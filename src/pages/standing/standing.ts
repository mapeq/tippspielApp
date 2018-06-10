import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Standing } from '../../model/standing';
import { StatsService } from '../../api/stats.service';
import {ImageService} from '../../api/image.service';
import { Inject, Optional }  from '@angular/core';
import { BASE_PATH }  from '../../variables';
import {EndpointProvider} from '../../providers/endpoint/endpoint';


@IonicPage()
@Component({
  selector: 'page-standing',
  templateUrl: 'standing.html',
})
export class StandingPage {

  private standing: Array<Standing>;
  private imgsrc:string;
  private basePath:string;

  constructor(public navCtrl: NavController, private statsApi: StatsService,  @Optional()@Inject(BASE_PATH) basePath: string,
  private endpoint: EndpointProvider
) {
        this.basePath = basePath;
        this.imgsrc = basePath +"IMAGE/{{user.image}}/S/";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingPage');
  }

  ionViewWillEnter(){
      this.endpoint.checkLogin().then(check =>{
        this.loadData();
      });

  }

  private loadData(){

    let that = this;

    this.statsApi.getStanding().subscribe(function(data){
        for (let i = 0; i < data.length; i++) {
            data[i].imageUrl = that.basePath +"/IMAGE/"+data[i].image+"/S/ ";
        }

        that.standing = data;

    });

  }

}
