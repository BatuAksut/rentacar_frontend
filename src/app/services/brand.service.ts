import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResponseModel } from '../models/brandResponseModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string="https://localhost:44309/api/brand/getall";

  getBrands():Observable<BrandResponseModel>{
    return this.httpClient
    .get<BrandResponseModel>(this.apiUrl)
  }
}
