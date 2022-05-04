import {Moment} from 'moment';

export class ParkingResponseModel {
  id: number;
  slotId: string;
  slotSize: number;
  carId: number;
  toa: Moment;
  toe: Moment;
  isAvailable: number;
  plateNumber: string;
}
