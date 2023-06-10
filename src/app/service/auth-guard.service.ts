import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService
  implements CanActivate, CanActivateChild, CanLoad
{
  public canActivate() {
    return !AuthService.requireSignIn();
  }

  public canActivateChild() {
    return !AuthService.requireSignIn();
  }

  public canLoad() {
    return !AuthService.requireSignIn();
  }
}
