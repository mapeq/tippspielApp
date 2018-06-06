import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Standing } from '../../model/standing';
import { StatsService } from '../../api/stats.service';
import {ImageService} from '../../api/image.service';
import { Inject, Optional }  from '@angular/core';
import { BASE_PATH }                     from '../../variables';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

private standing: Array<Standing>;
private imgsrc:string;
private basePath:string;

  constructor(public navCtrl: NavController, private statsApi: StatsService,  @Optional()@Inject(BASE_PATH) basePath: string) {

      this.basePath = basePath;
    this.imgsrc = basePath +"IMAGE/{{user.image}}/S/";
    this.loadData();
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
