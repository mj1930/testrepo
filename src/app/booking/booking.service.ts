import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';
 

@Injectable()
export class BookingService {

  constructor(private _router: Router, private http: Http) { }

  addNewBooking(body, nOfPassengers) {
    let bodyData = {
      body,
      nOfPassengers
    }
    return this.http.post(`http://localhost:3000/booking/addBooking`, bodyData)
      .toPromise().then((res: Response) => res.json()); 
  }
}
