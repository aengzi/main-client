import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return !AuthService.requireSignIn();
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return !AuthService.requireSignIn();
  }

  public canLoad(route: Route): any {

    return !AuthService.requireSignIn();
  }
}
