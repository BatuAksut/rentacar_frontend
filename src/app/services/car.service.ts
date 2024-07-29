import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetailDtoResponseModel } from '../models/carDetailDtoResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl:string="https://localhost:44309/api/Car/getcardetails";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<CarDetailDtoResponseModel>{
    return this.httpClient
    .get<CarDetailDtoResponseModel>(this.apiUrl)
  }
}
