import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XhrService {

  public static promise(method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT', url: string, body: any = {}) {

    return from(new Promise((resolve, reject) => {
      const request = new XMLHttpRequest;
      request.open(method, url);
      request.onload = function () {
        return resolve(request.responseText);
      };
      request.send(JSON.stringify(body));
    }));
  }
}
