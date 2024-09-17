import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetailDto } from '../models/carDetailDto';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44309/api/Car/";

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getcarsbybrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getcarsbycolor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetailById(id: number): Observable<{ data: CarDetailDto, success: boolean, message: string | null }> {
    return this.httpClient.get<{ data: CarDetailDto, success: boolean, message: string | null }>(`${this.apiUrl}getcardetailbyid?id=${id}`);
  }

  getCarById(id: number): Observable<{ data: Car, success: boolean, message: string | null }> {
    return this.httpClient.get<{ data: Car, success: boolean, message: string | null }>(`${this.apiUrl}getbyid?id=${id}`);
  }
  getCarDetailByIdWithImages(id: number): Observable<{ data: CarDetailDto, success: boolean, message: string | null }> {
    return this.httpClient.get<{ data: CarDetailDto, success: boolean, message: string | null }>(`${this.apiUrl}getcardetailbyidwithimages?id=${id}`);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",car)
  }

  // Güncelleme metodu
  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(`${this.apiUrl}update`, car);
  }

  // Silme metodu
  delete(carId: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}delete?id=${carId}`);
  }
}
