import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { RentalDetailDtoResponseModel } from '../models/rentalDetailDtoResponseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string="https://localhost:44309/api/rental/getrentaldetails";

  getRentals():Observable<RentalDetailDtoResponseModel>{
    return this.httpClient
    .get<RentalDetailDtoResponseModel>(this.apiUrl)
  }
}
