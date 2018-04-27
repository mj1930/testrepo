import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';

@Injectable()
export class DisplaySeatsService {

  constructor(private _router: Router, private http: Http) { }

  getBookedTickets() {
    return this.http.get(`http://localhost:3000/booking/getTickets/`)
    .toPromise().then((res: Response) => res.json());
  }
}
