import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { BrandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }
  apiUrl: string = "https://localhost:44309/api/brand/";

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient
      .get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }

  add(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand);
  }

  // Yeni: ID ile Marka Getir
  getBrandById(brandId: number): Observable<BrandResponseModel> {
    return this.httpClient
      .get<BrandResponseModel>(this.apiUrl + "getbyid?id=" + brandId);
  }

  // Yeni: Marka Güncelleme
  updateBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient
      .post<ResponseModel>(this.apiUrl + "update", brand);
  }
}
