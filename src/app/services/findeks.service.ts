// findeks.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindeksService {
  constructor() {}

  getFindeksScore(customerId: number): Observable<number> {
    const findeksScore = Math.floor(Math.random() * 1900) + 1;
    return of(findeksScore);
  }
}
