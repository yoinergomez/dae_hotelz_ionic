import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
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

  constructor(public http: Http) { }

  /**
   * Get the availables rooms from a petition http
   */
  getAvalaibleRooms(hotel_name: string, info: any) {
    return new Promise((resolve, reject) => {
      /*let url = "https://udeain.herokuapp.com/api/v1/rooms?arrive_date=01-01-2017&leave_date=02-02-2017&city=05001&hosts=3&room_type=l"*/
      let url = hotel_name + "/rooms?" + "arrive_date=" + info.arrive_date + "&leave_date=" + info.leave_date + "&city=" + info.city + "&hosts=" + info.hosts + "&room_type=" + info.room_type;
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

    let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3NjA3YWVhMDdlOTQzNzA1MTdhNjEyNmExODRkMTI3MmE2OTY1OTEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ29ob3RlbHMtNWE1ODkiLCJuYW1lIjoiWU9JTkVSIEVTVEVCQU4gR8OTTUVaIEFZQUxBIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tS19hbFhId1JjWW8vQUFBQUFBQUFBQUkvQUFBQUFBQUFBWVEvSTZtOGQtYnkzalkvcGhvdG8uanBnIiwiYXVkIjoiZ29ob3RlbHMtNWE1ODkiLCJhdXRoX3RpbWUiOjE1MTE1OTQyMjgsInVzZXJfaWQiOiJsQ3o4QldiSDQ4YVBsdEN1OVJESjJpUzhhVzgzIiwic3ViIjoibEN6OEJXYkg0OGFQbHRDdTlSREoyaVM4YVc4MyIsImlhdCI6MTUxMTU5NDIyOCwiZXhwIjoxNTExNTk3ODI4LCJlbWFpbCI6InlvaW5lci5nb21lekB1ZGVhLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA1OTM0NjQ0MzMwOTEzMzExNzI3Il0sImVtYWlsIjpbInlvaW5lci5nb21lekB1ZGVhLmVkdS5jbyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.o8v2lVkz8FjSH1_6oR2JQaoVFblaQKEU6Nqvdo3SRYHfNb6gDEaYa1ewB3v1Jrk2cPKMaMBF38NSPKlyeWUUbyrWjdvJehKbI7ncNJd7-e_76hMtQCwD1xEdXvvLz9DiKSX2wVDIdHeOturiAHqoK7G8ZuY15WzCJ109D-paneD6FUwSwDecFU74rmkRZXGJKFe4uS7ASz7OVDghfkSbCeQ-rTJC9BEeIMbVVI6nYs5OcaFF3I0D0UKZefLlBOt9YyPUxTDGz-tnoc-lX35HhTQ9HpCOoC71p_9idPzxU2GrG9EnbhsvowAhok6gniNjdPeCV122FYifxHolaw19-Q";
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
    let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3NjA3YWVhMDdlOTQzNzA1MTdhNjEyNmExODRkMTI3MmE2OTY1OTEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ29ob3RlbHMtNWE1ODkiLCJuYW1lIjoiWU9JTkVSIEVTVEVCQU4gR8OTTUVaIEFZQUxBIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tS19hbFhId1JjWW8vQUFBQUFBQUFBQUkvQUFBQUFBQUFBWVEvSTZtOGQtYnkzalkvcGhvdG8uanBnIiwiYXVkIjoiZ29ob3RlbHMtNWE1ODkiLCJhdXRoX3RpbWUiOjE1MTE1OTQyMjgsInVzZXJfaWQiOiJsQ3o4QldiSDQ4YVBsdEN1OVJESjJpUzhhVzgzIiwic3ViIjoibEN6OEJXYkg0OGFQbHRDdTlSREoyaVM4YVc4MyIsImlhdCI6MTUxMTU5NDIyOCwiZXhwIjoxNTExNTk3ODI4LCJlbWFpbCI6InlvaW5lci5nb21lekB1ZGVhLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA1OTM0NjQ0MzMwOTEzMzExNzI3Il0sImVtYWlsIjpbInlvaW5lci5nb21lekB1ZGVhLmVkdS5jbyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.o8v2lVkz8FjSH1_6oR2JQaoVFblaQKEU6Nqvdo3SRYHfNb6gDEaYa1ewB3v1Jrk2cPKMaMBF38NSPKlyeWUUbyrWjdvJehKbI7ncNJd7-e_76hMtQCwD1xEdXvvLz9DiKSX2wVDIdHeOturiAHqoK7G8ZuY15WzCJ109D-paneD6FUwSwDecFU74rmkRZXGJKFe4uS7ASz7OVDghfkSbCeQ-rTJC9BEeIMbVVI6nYs5OcaFF3I0D0UKZefLlBOt9YyPUxTDGz-tnoc-lX35HhTQ9HpCOoC71p_9idPzxU2GrG9EnbhsvowAhok6gniNjdPeCV122FYifxHolaw19-Q";
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
    let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3NjA3YWVhMDdlOTQzNzA1MTdhNjEyNmExODRkMTI3MmE2OTY1OTEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ29ob3RlbHMtNWE1ODkiLCJuYW1lIjoiWU9JTkVSIEVTVEVCQU4gR8OTTUVaIEFZQUxBIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tS19hbFhId1JjWW8vQUFBQUFBQUFBQUkvQUFBQUFBQUFBWVEvSTZtOGQtYnkzalkvcGhvdG8uanBnIiwiYXVkIjoiZ29ob3RlbHMtNWE1ODkiLCJhdXRoX3RpbWUiOjE1MTE1OTQyMjgsInVzZXJfaWQiOiJsQ3o4QldiSDQ4YVBsdEN1OVJESjJpUzhhVzgzIiwic3ViIjoibEN6OEJXYkg0OGFQbHRDdTlSREoyaVM4YVc4MyIsImlhdCI6MTUxMTU5NDIyOCwiZXhwIjoxNTExNTk3ODI4LCJlbWFpbCI6InlvaW5lci5nb21lekB1ZGVhLmVkdS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA1OTM0NjQ0MzMwOTEzMzExNzI3Il0sImVtYWlsIjpbInlvaW5lci5nb21lekB1ZGVhLmVkdS5jbyJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.o8v2lVkz8FjSH1_6oR2JQaoVFblaQKEU6Nqvdo3SRYHfNb6gDEaYa1ewB3v1Jrk2cPKMaMBF38NSPKlyeWUUbyrWjdvJehKbI7ncNJd7-e_76hMtQCwD1xEdXvvLz9DiKSX2wVDIdHeOturiAHqoK7G8ZuY15WzCJ109D-paneD6FUwSwDecFU74rmkRZXGJKFe4uS7ASz7OVDghfkSbCeQ-rTJC9BEeIMbVVI6nYs5OcaFF3I0D0UKZefLlBOt9YyPUxTDGz-tnoc-lX35HhTQ9HpCOoC71p_9idPzxU2GrG9EnbhsvowAhok6gniNjdPeCV122FYifxHolaw19-Q";
    let headers = new Headers();
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
