import * as _ from 'lodash';
import { Inject, Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, filter, switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/service/storage.service';
import { Model } from 'src/app/model';
import { Observable, from, forkJoin, of, ObservableInput, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelifyApiInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler): any {

    return next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse ),
      map((response: HttpResponse<any>): any => {

        let body = response.body;

        if ( typeof body == 'undefined' ) {
          return response;
        }

        if ( typeof body.errors != 'undefined' ) {
          for (let error in body.errors) {
            StorageService.get('snack-bar').open(
              '⛔ '+JSON.stringify(body.errors[error]),
              'close', {
              duration: 5000,
              verticalPosition: 'top'
            });
          }

          throw new Error(JSON.stringify(body.errors));
        }

        if ( typeof body.result != 'object' || !body.result ) {
          return response.clone({
            body: body.result
          });
        }

        if ( typeof body.result.data != 'undefined' ) {
          body.result.data = this.objectify(body.result.data);
        } else {
          body.result = this.objectify(body.result);
        }

        return response.clone({
          body: body.result
        });
      })
    );
  }

  public objectify(data: any) {

    let isModel = Array.isArray(data) ? false : true;
    let collect = isModel ? [data] : data;
    let models  = _.map(collect, (item: any) => {

      let type         = item._type;
      let attributes   = item._attributes;
      let relations    = item._relations;
      let modelClass   = _.upperFirst(_.camelCase(type.split('/').pop()));
      let moduleLoader = require('src/app/model/' + type.replace(/_/g, '-'));
      let model        = <Model<any, any>>new moduleLoader[modelClass];

      _.each(attributes, (value, key) => {
        model.setAttr(key, value);
      });

      _.each(relations, (value:any, key:any) => {
        model.setRelation(key, value == null ? value : this.objectify(value));
      });

      return model;
    });

    return isModel ? models[0] : models;
  }

}
