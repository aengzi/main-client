import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static user: User;

  public static getUser() {
    return AuthService.user;
  }

  public static isSignIn() {
    return AuthService.user != undefined;
  }

  public static setUser(user: User) {
    AuthService.user = user;
  }

  public static requireSignIn() {
    if (!AuthService.getUser()) {
      StorageService.get('router').navigate(['/sign-in'], {
        queryParams: {
          referrer: StorageService.get('router').url
        }
      });
    }

    return !AuthService.isSignIn();
  }

}
