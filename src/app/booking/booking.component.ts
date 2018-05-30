import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BookingService } from './booking.service';
import { Router } from '@angular/router';
import { DisplaySeatsService } from './../display-seats/display-seats.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [BookingService, DisplaySeatsService]
})
export class BookingComponent implements OnInit {

  bookings;
  bookedTickets;
  busy: Promise<any>;
  getSeats: Promise<any>;
  bookingForm: FormGroup;
  totalSeats;
  reservedTicket:any = [];
  genderData = ['Male', 'Female', 'Other'];
  numberData = [1, 2, 3, 4, 5, 6, 7];
  nOfPassengers = [1];
  constructor(
    private service: BookingService,
    private _router: Router,
    private getService: DisplaySeatsService,
    private flashMsgService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getTotalSeats();
    this.getTickets();
  }

  getTotalSeats() {
    this.getSeats = this.getService.getBookedTickets().then(
      (res: any) => {
        if (res.status == 200) {
          this.totalSeats = 80 - res.data.length;
        }
        else {
          this.totalSeats = 80;
        }
      }
    )
  }

  passengerVal(value) {
      this.nOfPassengers = value;
  }

  onClick() {
    this._router.navigate([`/booked-seats/${this.nOfPassengers}`]);
  }

  getTickets() {
    this.busy = this.getService.getBookedTickets().then(
      (res: any) => {
        if(res.status == 200){
          this.bookedTickets = res.data;
          for (let i = 0; i< this.bookedTickets.length; i++) {
            this.reservedTicket.push(this.bookedTickets[i].seat);
          }
          localStorage.setItem('tickets', JSON.stringify(this.reservedTicket));
        }
        else {
          this.bookedTickets = [];
          this.flashMsgService.show(res.msg, {
            classes: ['alert', 'alert-error'],
            timeout: 2000, 
          })
        }
      }
    )
  }
  
}
