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

  getAvalaibleRooms( hotelName:string ){
    return new Promise((resolve, reject)=>{
      let link = "assets/" + hotelName + ".json"
      this.http.get(link).subscribe(
        (data) =>{
          resolve(JSON.parse(data._body));
          //resolve(null);
        }, (error)=>{
          reject(null);
        }
      );
    });
  }
}
