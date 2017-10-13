import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HotelzProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotelzProvider {

  constructor(public http: Http) {
  }

  getAvalaibleRooms(){
    return new Promise((resolve, reject)=>{
      this.http.get("assets/response-dezameron.json").subscribe(
        (data) =>{
          resolve(data.json())
          //return(JSON.parse(data))
          //resolve(null);
        }, (error)=>{
          reject(null);
        }
      );
    });
  }
}
