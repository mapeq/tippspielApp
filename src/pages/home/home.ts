import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Standing } from '../../model/standing';
import { StatsService } from '../../api/stats.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

private standing: Array<Standing>;

  constructor(public navCtrl: NavController, private statsApi: StatsService) {
    this.loadData();
  }

  private loadData(){
let that = this;

    this.statsApi.getStanding().subscribe(function(data){
        that.standing = data;

    });

  }

}
