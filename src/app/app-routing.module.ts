import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ParkingComponent} from './Parking/parking.component';

const routes: Routes = [
  {
    path: '',
    component: ParkingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
