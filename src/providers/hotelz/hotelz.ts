import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HotelzProvider provider.
*/
@Injectable()
export class HotelzProvider {

  /*Endpoints
    https://udeain.herokuapp.com/api/v1
      - /rooms/arrive_date/01-01-2017/leave_date/02-02-2017/city/05001/hosts/3/room_type/l
  */

  constructor(public http: Http) {}

  /**
   * Get the availables rooms from a petition http
   */
  getAvalaibleRooms(hotel_name: string){
    return new Promise((resolve, reject)=>{
        let url = "https://udeain.herokuapp.com/api/v1/rooms/arrive_date/01-01-2017/leave_date/02-02-2017/city/05001/hosts/3/room_type/l"
        //let url = "assets/" + hotel_name
        this.http.get(url).subscribe(
          (data) =>{
            resolve(data.json());
            /*let response:any = data;
            if(this.validateJson(JSON.parse(response._body))){
              resolve(JSON.parse(response._body));
            }else{
              resolve(null);
            }*/
          }, (error)=>{
            reject(null);
          }
        );
    });
  }

  /**
   * Validate if a json is formed correct
   * @param varRooms
   */
  validateJson(varRooms:any){
    let size = varRooms.rooms.length;
    if(size == 0 || this.validateValue(varRooms.check_in) ||this.validateValue(varRooms.check_out)||
      this.validateValue(varRooms.hotel_id)||this.validateValue(varRooms.hotel_name)||
      this.validateValue(varRooms.hotel_website)||
      /*this.validateInteger(varRooms.hotel_location.lat)||this.validateInteger(varRooms.hotel_location.long)||*/
      this.validateValue(varRooms.hotel_location.address)||
      this.validateValue(varRooms.hotel_thumbnail)){
      return false;
    }
    for (let index = 0; index < size; index++) {
      let element = varRooms.rooms[index];
      if(this.validateValue(element.room_type) || this.validateValue(element.currency) ||
        this.validateValue(element.room_thumbnail)||this.validateValue(element.description)||
        this.validateInteger(element.capacity) || this.validateInteger(element.price)||
        this.validateInteger(element.beds.simple) || this.validateInteger(element.beds.simple)){
        return false;
      }
    }
    return true;
  }

  /**
   * Return true if a json is not empty or undefined
   * @param jsonString
   */
  validateValue(jsonString){
    if(typeof jsonString === 'undefined'){
      return true;
    }
    return (jsonString.length === 0 || !jsonString.trim());
  }

  /**
   * Returns true if a json is not undefined or it is less than zero
   * @param jsonInteger
   */
  validateInteger(jsonInteger){
    if(typeof jsonInteger === 'undefined'){
      return true;
    }else if (jsonInteger < 0){
      return true;
    }
    return false;
  }
}
