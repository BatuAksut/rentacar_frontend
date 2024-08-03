import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string="https://localhost:44309/api/rental/getrentaldetails";

  getRentals():Observable<ListResponseModel<RentalDetailDto>>{
    return this.httpClient
    .get<ListResponseModel<RentalDetailDto>>(this.apiUrl)
  }
}
