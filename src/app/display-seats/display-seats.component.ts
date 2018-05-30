import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DisplaySeatsService } from './display-seats.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { BookingService } from './../booking/booking.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-display-seats',
  templateUrl: './display-seats.component.html',
  styleUrls: ['./display-seats.component.css'],
  providers: [DisplaySeatsService, BookingService]
})
export class DisplaySeatsComponent implements OnInit {

  busy: Promise<any>;
  book: Promise<any>;
  nOfTickets;
  checkBoxArray;
  bookedTickets:any = [];
  reservedTicket: any = [];
  status: boolean = false;
  emailFormArray = [];
  constructor(
    private formBuilder: FormBuilder,
    private service: DisplaySeatsService,
    private serviceBook: BookingService,
    private router: Router,
    private cd: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    private flashMsgService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.checkBoxArray = this.formBuilder.group({
      checkBox: this.formBuilder.array([])
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.nOfTickets = params.tickets;
    });
    this.bookedTickets = JSON.parse(localStorage.getItem('tickets'));
  }

  checkStatus(ticket) {
        if (this.bookedTickets.indexOf(ticket) != -1) {
          this.status = true;
          return this.status;
        }
        else {
          this.status = false;
          return this.status;
        }
  }


  totalTicket(number) {
    let nOfSeats = [];
    for ( let i =1; i <= number; i++) {
      nOfSeats.push(i);
    }
    return nOfSeats;
  }

  onCheck(event) {
    if (this.nOfTickets <= 0) {
      alert('Please select atleast 1 ticket for booking');
      this.router.navigate(['/']);
    }
    else {
      if (this.reservedTicket) {
        if (this.reservedTicket.length < this.nOfTickets) {
          this.checkSeat(event)
        }
        else {
          for (var i = 0; i <= this.reservedTicket.length; i++) {
            $("#"+this.reservedTicket[i]).prop('checked', false);
          }
          this.reservedTicket = [];
          this.checkSeat(event);
        }
      }
      else {
        this.checkSeat(event);
      }
    }
  }

  checkSeat(event) {
    let id = +event.target.id;
    let checked = event.target.checked;
    let nextCheck = id+1;
    let totalSeat = this.nOfTickets;
    let val = $('#'+nextCheck+':checked').length;
    if (val > 0 && totalSeat >= 2) {
      alert('Please select seats 1 by 1');
      this.reserveSeat(event);
    }
    else {
      this.reservedTicket.push(id);
      for (var i = 0; i <= totalSeat-2; i++) {
        $("#"+nextCheck).prop('checked', checked);
        this.reservedTicket.push(nextCheck);
        nextCheck += 1;
      }
    }
  }

  reserveSeat(event){
    let id = +event.target.id;
    let emailForm = <FormArray>this.checkBoxArray.controls.checkBox;
    emailForm.push(new FormControl(id));
    this.reservedTicket= emailForm.value;
  }

  onClick() {
    this.book = this.serviceBook.addNewBooking(this.reservedTicket, this.nOfTickets).then(
      (res: any) => {
        if (res.status == 200) {
          this.flashMsgService.show(res.msg, {
            classes: ['alert', 'alert-success', 'top'],
            timeout: 2000, 
          })
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      }
    )
  }

}
