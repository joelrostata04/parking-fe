import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParkingResponseModel} from './models/parking-response.model';
import {CarExitResponseModel} from './models/car-exit-response.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(
    private http: HttpClient
  ) { }

  getAllLargeParking(): Observable<ParkingResponseModel[]> {
    const url = `http://localhost:8080/api/park/all`;
    return this.http.get<ParkingResponseModel[]>(url);
  }

  carEntry(carEntryParking){
    const toa = this.toIsoString(new Date());
    const url = `http://localhost:8080/api/cars`;
    console.log(typeof toa, toa);
    const params = new HttpParams().set('toa', toa);
    return this.http.post<any>(url, carEntryParking, {params});
  }

  carParking(parkingId: string, plateNumber: string): Observable<ParkingResponseModel>{
    const params = new HttpParams().set('parkingId', parkingId).set('plateNumber', plateNumber);
    const url = `http://localhost:8080/api/park`;
    return this.http.put<ParkingResponseModel>(url, {}, {params});
  }

  carExiting(parkingId: string, plateNumber: string): Observable<CarExitResponseModel>{
    const params = new HttpParams().set('parkingId', parkingId).set('plateNumber', plateNumber);
    const url = `http://localhost:8080/api/payment`;
    return this.http.put<CarExitResponseModel>(url, {}, {params});
  }

  toIsoString(date) {
    // tslint:disable-next-line:one-variable-per-declaration
    const tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = num => {
        return (num < 10 ? '0' : '') + num;
      };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds());
  }
}
