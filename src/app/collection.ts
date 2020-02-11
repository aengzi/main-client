import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/service/http.service';
import { Model } from 'src/app/model';

export class Collection<T extends Model<any,any>> {

  protected items: T[];

  constructor(items: T[]) {

    this.items = items;
  }

  public all(): T[] {

    return this.items;
  }

  public static server(): HttpClient {

    return HttpService.api();
  }

}
