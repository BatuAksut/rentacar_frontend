import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string="https://localhost:44309/api/brand/getall";

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient
    .get<ListResponseModel<Brand>>(this.apiUrl)
  }
}
