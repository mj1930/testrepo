import { Component, OnInit } from '@angular/core';
import { DisplaySeatsService } from './display-seats.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-display-seats',
  templateUrl: './display-seats.component.html',
  styleUrls: ['./display-seats.component.css'],
  providers: [DisplaySeatsService]
})
export class DisplaySeatsComponent implements OnInit {

  busy: Promise<any>;
  bookedTickets:any = [];
  constructor(
    private service: DisplaySeatsService,
    private flashMsgService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getTickets();
  }

  totalTicket(number) {
    let nOfSeats = [];
    for ( let i =1; i <= number; i++) {
      nOfSeats.push(i);
    }
    return nOfSeats;
  }

  getTickets() {
    this.busy = this.service.getBookedTickets().then(
      (res: any) => {
        if(res.status == 200){
          this.bookedTickets = res.data;
          this.flashMsgService.show(res.msg, {
            classes: ['alert', 'alert-success', 'top'], // You can pass as many classes as you need
            timeout: 2000, 
          })
        }
        else {
          this.bookedTickets = [];
          this.flashMsgService.show(res.msg, {
            classes: ['alert', 'alert-error'], // You can pass as many classes as you need
            timeout: 2000, 
          })
        }
      }
    )
  }

}
