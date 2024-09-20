import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Veriyi ekle
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Veriyi al
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Veriyi sil
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Tüm verileri sil
  clear(): void {
    localStorage.clear();
  }
}
