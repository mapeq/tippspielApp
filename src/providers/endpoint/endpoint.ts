import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatsService } from '../../api/stats.service';
import {ImageService} from '../../api/image.service';
import { Storage } from '@ionic/storage';
import {LoginData} from '../../model/loginData';

/*
  Generated class for the EndpointProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EndpointProvider {

  constructor(public http: HttpClient, private statsApi: StatsService, private imageApi:ImageService, public storage: Storage) {
    console.log('Hello EndpointProvider Provider');
  }

  public getUser():Promise<LoginData> {
      return new Promise((resolve, reject) => {
        this.storage.get("user").then(login =>{
          let user:LoginData = login;
              resolve(user);
        });
  });

   



  }

}
