import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string="https://localhost:44309/api/rental/";
  //
  getRentals():Observable<ListResponseModel<RentalDetailDto>>{
    let newPath = this.apiUrl + "getrentaldetails";
    return this.httpClient
    .get<ListResponseModel<RentalDetailDto>>(newPath)
  }

  getRentalById(rentalId: number): Observable<Rental> {
    let newPath = `${this.apiUrl}getrentalgetbyid?id=${rentalId}`;
    return this.httpClient.get<Rental>(newPath);
  }

  checkById(carId: number): Observable<Rental> {
    let newPath = `${this.apiUrl}checkavailability?carId=${carId}`;
    return this.httpClient.get<Rental>(newPath);
  }
  checkAvailability(carId: number, rentDate: Date, returnDate: Date): Observable<any> {
    let newPath = `${this.apiUrl}checkavailability?carId=${carId}&startDate=${rentDate.toISOString()}&endDate=${returnDate.toISOString()}`;
    return this.httpClient.get<any>(newPath);
  }
  rentCar(rental: Rental): Observable<any> {
    let newPath = `${this.apiUrl}add`;
    return this.httpClient.post<any>(newPath, rental);
  }
  
}
