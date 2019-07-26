import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('aengzi-auth-token')) {

      return next.handle(request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('aengzi-auth-token')
        )
      }));
    }

    return next.handle(request);
  }

}
