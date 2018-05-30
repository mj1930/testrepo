import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';
import { componentFactoryName } from '@angular/compiler';
import { BookingComponent } from './booking/booking.component';
import { DisplaySeatsComponent } from './display-seats/display-seats.component' ;

export const appRoutes: Routes = [
    {
        path: '',
        component: BookingComponent
    },
    {
        path: 'booked-seats/:tickets',
        component: DisplaySeatsComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });