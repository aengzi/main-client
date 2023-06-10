import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static data: { [key: string]: any } = {};

  public static set(key: string, val: any) {
    return (this.data[key] = val);
  }

  public static has(key: string) {
    return !!this.data[key];
  }

  public static get(key: string) {
    return this.data[key];
  }

  public static setAndGet(key: string, val: any) {
    if (this.has(key)) {
      return of(this.get(key));
    }

    if (val instanceof Observable) {
      val.subscribe((result) => {
        this.set(key, result);
      });
    } else if (val instanceof Promise) {
      val.then((result) => {
        this.set(key, result);
      });
    } else {
      this.set(key, val);
    }

    return val;
  }
}
