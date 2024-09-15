import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:44309/api/payment/'; // Sahte banka API'sinin URL'si

  constructor(private httpClient: HttpClient) {}

  processPayment(creditCardInfo: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}process`, { creditCardInfo });
  }
}
