import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usernames: string[] = ['kullanici1', 'kullanici2', 'kullanici3'];

  getUsernames(): string[] {
    return this.usernames;
  }
}
