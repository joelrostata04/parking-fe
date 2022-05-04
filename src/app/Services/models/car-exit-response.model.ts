import {Moment} from 'moment';

export class CarExitResponseModel {
  id: number;
  carSize: string;
  entry: string;
  plateNumber: string;
  toa: Moment;
  toe: Moment;
  isParked: number;
  priceToPay: number;
  isContinue: number;
}
