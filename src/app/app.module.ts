import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http'
import { BookingComponent } from './booking/booking.component';
import { DisplaySeatsComponent } from './display-seats/display-seats.component';
import { FlashMessagesModule } from 'ngx-flash-messages';

@NgModule({
  imports:      [routing, BrowserModule, FormsModule,ReactiveFormsModule, HttpModule, FlashMessagesModule],
  declarations: [ AppComponent, BookingComponent, DisplaySeatsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
