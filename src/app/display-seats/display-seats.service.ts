import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment' ;

@Injectable()
export class DisplaySeatsService {

  BASE_URL: string = environment.config.API_URL;
  constructor(private _router: Router, private http: Http) { }

  getBookedTickets() {
    return this.http.get(`${this.BASE_URL}booking/getTickets/`)
    .toPromise().then((res: Response) => res.json());
  }
}
