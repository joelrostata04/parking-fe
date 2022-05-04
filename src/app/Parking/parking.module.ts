import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ParkingComponent} from './parking.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule
    ],
  declarations: [
    ParkingComponent
  ]
})
export class ParkingModule{ }
