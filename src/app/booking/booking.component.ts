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
  busy: Promise<any>;
  getSeats: Promise<any>;
  bookingForm: FormGroup;
  totalSeats;
  genderData = ['Male', 'Female', 'Other'];
  numberData = [1, 2, 3, 4, 5, 6, 7];
  nOfPassengers = [1];
  constructor(
    private formBuilder: FormBuilder,
    private service: BookingService,
    private _router: Router,
    private getService: DisplaySeatsService,
    private flashMsgService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      booking: this.formBuilder.array([
        this.initTravellers()
      ]) 
    })
    this.getTotalSeats();
  }

  get booking(): FormArray {
    return this.bookingForm.get('booking') as FormArray;
  };

  private getTotalSeats() {
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

  private passengerVal(value) {
    this.nOfPassengers = value;
    if (value > this.booking.length) {
      let numbers_to_add = value - this.booking.length;
      for (let i =0; i < numbers_to_add; i++) {
        this.addTravellers();
      }
    }
    else {
      let numbers_to_add = this.booking.length - value;
      for (let i = numbers_to_add; i > 0 ; i--) {
        this.booking.removeAt(i);
      }
    }
  }

  addTravellers() {
    this.bookings = this.bookingForm.get('booking');
    this.bookings.push(this.initTravellers());
  }

  private initTravellers(): FormGroup {
    return this.formBuilder.group({
      name: '',
      age: ''
    })
  }

  onClick() {
   this.busy = this.service.addNewBooking(this.bookingForm.value, this.nOfPassengers).then(
      (res: any) => {
        if(res.status == 200){
          this.flashMsgService.show(res.msg, {
            classes: ['alert', 'alert-success'],
            timeout: 2000, 
          })
          this.getTotalSeats();
        }
        else {
          this.flashMsgService.show(res.msg, {
            classes: ['alert', 'alert-warning'],
            timeout: 2000, 
          })
        }
      }
    )
  }
  
}
