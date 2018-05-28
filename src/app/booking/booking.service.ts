import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment' ;

@Injectable()
export class BookingService {

  BASE_URL: string = environment.config.API_URL;
  constructor(private _router: Router, private http: Http) { }

  addNewBooking(body, nOfPassengers) {
    let bodyData = {
      body,
      nOfPassengers
    }
    return this.http.post(`${this.BASE_URL}booking/addBooking`, bodyData)
      .toPromise().then((res: Response) => res.json()); 
  }
}
