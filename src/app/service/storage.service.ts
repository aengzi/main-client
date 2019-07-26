import { Injectable, Inject, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static data = {};

  public static set(key, val) {
    return this.data[key] = val;
  }

  public static has(key) {
    return !!this.data[key];
  }

  public static get(key) {
    return this.data[key];
  }

  public static setAndGet(key, val) {

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
      })
    } else {
      this.set(key, val);
    }

    return val;
  }
}
