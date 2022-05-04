import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ParkingResponseModel} from '../Services/models/parking-response.model';
import {ParkingService} from '../Services/parking.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarEntryRequestModel} from '../Services/models/car-entry-request.model';
import * as moment from 'moment';


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {

  @ViewChild('parking')
  private parking: ElementRef;
  @ViewChild('greetingModal')
  private greetingModal: ElementRef;
  @ViewChild('exitingModal')
  private exitingModal: ElementRef;

  allParking: ParkingResponseModel[] = null;
  largeParking: ParkingResponseModel[] = [];
  midParking: ParkingResponseModel[] = [];
  smallParking: ParkingResponseModel[] = [];
  slotAvailableForCar: ParkingResponseModel[] = [];
  entry: string;
  small = 'SMALL';
  mid = 'MEDIUM';
  large = 'LARGE';
  carSize: string;
  plateNumber: string;
  carSlotId: string;
  exitingCarPark: ParkingResponseModel;
  exitingCarParkPlateNumber: string;
  exitingCarParkId: string;
  exitingGreeting: string;
  priceToPay: number;
  parkDuration: any;
  isDisabled: boolean;

  constructor(
    private parkingService: ParkingService,
    private modalService: NgbModal
  )
   {}
  ngOnInit(): void {
    this.isDisabled = true;
    this.getAllParking();
  }

  getAllParking() {
    this.parkingService.getAllLargeParking().subscribe( parking => {
      this.allParking = parking;
      parking.forEach(p => {
        p.slotSize === 2 ?
          this.largeParking.push(p) : p.slotSize === 1 ?
            this.midParking.push(p) : this.smallParking.push(p);
      });
    });
  }

  openModalA(entrance) {
    this.entry = 'A';
    console.log(entrance);
    this.modalService.open(entrance, {centered: true});
  }
  openModalB(entrance) {
    this.entry = 'B';
    console.log(entrance);
    this.modalService.open(entrance, {centered: true});
  }
  openModalC(entrance) {
    this.entry = 'C';
    console.log(entrance);
    this.modalService.open(entrance, {centered: true});
  }

  carEntryRequest() {
    this.modalService.dismissAll();
    const carParkRequest = new CarEntryRequestModel();
    carParkRequest.carSize = this.carSize;
    carParkRequest.plateNumber = this.plateNumber;
    carParkRequest.entry = this.entry;
    this.parkingService.carEntry(carParkRequest).subscribe();
    setTimeout(() => {
      this.refreshMap();
    }, 1000);
  }

  carParkRequest() {
    this.parkingService.carParking(this.carSlotId, this.plateNumber).subscribe(park => {
      if (park){
        this.refreshMap();
      }
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }

  sortParkingResponseByEntry(slots: ParkingResponseModel[], entry: string): ParkingResponseModel[]{
    let sortedSlots: ParkingResponseModel[] = [];
    const secondEntry = entry === 'B' ? 'C' : entry === 'C' ? 'B' : 'A';
    const thirdEntry = secondEntry === 'C' ? 'B' : 'A';
    if (entry === 'A'){
      sortedSlots = [...slots];
    } else {
      slots.forEach(s => {
        if (s.slotId.includes(entry)){
          sortedSlots.push(s);
        }
      });
      slots.forEach(s2 => {
        if (s2.slotId.includes(secondEntry)){
          sortedSlots.push(s2);
        }
      });
      slots.forEach(s3 => {
        if (s3.slotId.includes(thirdEntry)){
          sortedSlots.push(s3);
        }
      });
    }
    return sortedSlots;
  }

  closeModal(){
    this.entry = null;
    this.carSize = null;
    this.plateNumber = null;
    this.modalService.dismissAll();
  }

  openExitCar(slotValue: ParkingResponseModel) {
    console.log(slotValue);
    this.modalService.open(this.exitingModal,
        {size: 'sm', backdrop: 'static', keyboard: false, centered: true});
    this.exitingCarParkId = slotValue.slotId;
    this.exitingCarParkPlateNumber = slotValue.plateNumber;
  }

  exitCar() {
    this.modalService.dismissAll();
    this.parkingService.carExiting(this.exitingCarParkId, this.exitingCarParkPlateNumber).subscribe(exitingCar => {
      if (exitingCar){
        console.log(exitingCar);
        const end = moment(exitingCar.toe);
        const start = moment(exitingCar.toa);
        this.parkDuration = Math.ceil(moment.duration(end.diff(start)).asHours());
        this.priceToPay = exitingCar.priceToPay;
        this.exitingGreeting = exitingCar.plateNumber;
        this.modalService.open(this.greetingModal,
          {centered: true,
            size: 'lg',
            backdrop: 'static',
            keyboard: false});
      }
      this.refreshMap();
    });
  }

  refreshMap(){
    this.allParking = [];
    this.midParking = [];
    this.smallParking = [];
    this.largeParking = [];
    this.entry = null;
    this.carSize = null;
    this.plateNumber = null;
    this.getAllParking();
  }

  reset() {
    this.exitingCarParkId = null;
    this.exitingCarParkPlateNumber = null;
    this.modalService.dismissAll();
  }

}
