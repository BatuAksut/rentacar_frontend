import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/userModel';
import { Observable } from 'rxjs';
import { UserForUpdateDto } from '../models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44309/api/auth/";

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }

  getUserEmails() {
    return this.httpClient.get<string[]>(this.apiUrl + "emails"); // Backend'den kullanıcı adlarını (e-postaları) al
  }

  isAuthenticated() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token") !== null;
    }
    return false;
  }

  getUsername() {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.fullName || null; // Tam adı döndür
    }
    return null; // Token yoksa null döndür
  }
  
  

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
    }
  }

  getUserData(): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "user");
}


updateUserData(userForUpdateDto: UserForUpdateDto): Observable<any> {
  return this.httpClient.put(this.apiUrl + "user", userForUpdateDto); // Kullanıcı verilerini güncelle
}
}
