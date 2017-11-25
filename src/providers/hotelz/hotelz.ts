import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the HotelzProvider provider.
*/
@Injectable()
export class HotelzProvider {

  token: string

  constructor(public http: Http, private _authService: AuthServiceProvider) {
    this.getToken();
   }

   getToken(){
    this._authService.getCurrentSession().then((session: any) => {
     this.token = session.stsTokenManager.accessToken;
    });
   }

  /**
   * Get the availables rooms from a petition http
   */
  getAvalaibleRooms(hotel_name: string, info: any) {
    return new Promise((resolve, reject) => {
      /*let url = "https://udeain.herokuapp.com/api/v1/rooms?arrive_date=01-01-2017&leave_date=02-02-2017&city=05001&hosts=3&room_type=l"*/
      let url = hotel_name + "/rooms?" + "arrive_date=" + info.arrive_date + "&leave_date=" + info.leave_date + "&city=" + info.city + "&hosts=" + info.hosts + "&room_type=" + info.room_type;
      console.log(url);
      
      this.http.get(url).subscribe(
        (data) => {
          let response: any = data.json();
          response.id = hotel_name;
          resolve(response);
        }, (error) => {
          reject(null);
        }
      );
    });
  }

  /*getAvalaibleRooms(hotel_name: string, info: any){
  return new Promise((resolve, reject)=>{
    this.http.get("assets/response-dezameron.json").subscribe(
      (data) =>{
        let response:any = data;
        if(this.validateJson(JSON.parse(response._body))){
          resolve(JSON.parse(response._body));
        }else{
          resolve(null);
        }
      }, (error)=>{
        reject(null);
      }
    );
  });
  }*/

  /* Do reserve of a room with http post request hotel url */
  doReserve(hotel_api_url: string, reserveInfo: any) {
    let url = hotel_api_url + "/rooms/reserve"
    console.log(url);

    let token = this.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      this.http.post(url, reserveInfo, options).subscribe(
        (data) => {
          let response: any = data.json();
          resolve(response);
        }, (error) => {
          let errorMessage: any = error.json();
          reject(errorMessage);
        }
      );
    });
  }

  getAllReservations(hotel_api_url: string) {
    let url = hotel_api_url + "/reservations"
    let token = this.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe(
        (data) => {
          let response: any = data.json();
          response.hotel_api_url = hotel_api_url;
          resolve(response);
        }, (error) => {
          let errorMessage: any = error.json();
          reject(errorMessage);
        }
      );
    });
  }

  cancelReservation(hotel_api_url: string,reservation_id:string) {
    let url = hotel_api_url + "/reservations?reserve_id=" + reservation_id
    let token = this.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.delete(url, options).subscribe(
        (data) => {
          let response: any = data.json();
          resolve(response);
        }, (error) => {
          let errorMessage: any = error.json();
          reject(errorMessage);
        }
      );
    });
  }

  /**
   * Validate if a json is formed correct
   * @param varRooms
   */
  validateJson(varRooms: any) {
    let size = varRooms.rooms.length;
    if (size == 0 || this.validateValue(varRooms.check_in) || this.validateValue(varRooms.check_out) ||
      this.validateValue(varRooms.hotel_id) || this.validateValue(varRooms.hotel_name) ||
      this.validateValue(varRooms.hotel_website) ||
      this.validateValue(varRooms.hotel_location.lat) || this.validateValue(varRooms.hotel_location.long) ||
      this.validateValue(varRooms.hotel_location.address) ||
      this.validateValue(varRooms.hotel_thumbnail)) {
      return false;
    }
    for (let index = 0; index < size; index++) {
      let element = varRooms.rooms[index];
      if (this.validateValue(element.room_type) || this.validateValue(element.currency) ||
        this.validateValue(element.room_thumbnail) || this.validateValue(element.description) ||
        this.validateInteger(element.capacity) || this.validateInteger(element.price) ||
        this.validateInteger(element.beds.simple) || this.validateInteger(element.beds.simple)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Return true if a json is not empty or undefined
   * @param jsonString
   */
  validateValue(jsonString) {
    if (typeof jsonString === 'undefined') {
      return true;
    }
    return (jsonString.length === 0 || !jsonString.trim());
  }

  /**
   * Returns true if a json is not undefined or it is less than zero
   * @param jsonInteger
   */
  validateInteger(jsonInteger) {
    if (typeof jsonInteger === 'undefined') {
      return true;
    } else if (jsonInteger < 0) {
      return true;
    }
    return false;
  }
}
