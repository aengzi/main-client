import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static user: User;
  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  public static getUser() {
    return AuthService.user;
  }

  public static isSignIn() {
    return AuthService.user != undefined;
  }

  public static setUser(user: User) {
    AuthService.user = user;
  }

  public requireSignIn() {
    if (!this.getUser()) {
      this.router.navigate(['/sign-in'], {
        queryParams: {
          referrer: this.router.url
        }
      });
    }

    return !this.isSignIn();
  }

  public getUser() {
    return AuthService.getUser();
  }

  public isSignIn() {
    return AuthService.isSignIn();
  }

  public setUser(user: User) {
    return AuthService.setUser(user);
  }
}
