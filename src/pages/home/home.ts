import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Standing } from '../../model/standing';
import { StatsService } from '../../api/stats.service';
import {ImageService} from '../../api/image.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

private standing: Array<Standing>;
private imgsrc:any;

  constructor(public navCtrl: NavController, private statsApi: StatsService, private imageApi:ImageService) {
    this.loadData();
    this.loadImg();
  }

  private loadData(){
let that = this;

    this.statsApi.getStanding().subscribe(function(data){
        that.standing = data;

    });

  }

  loadImg(){
      let that = this;
    this.imageApi.getImage('1', 'S', '').subscribe(function (img) {
            that.imgsrc = img;
            console.log(img);
    });

  }

}
