import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs';
import { Model } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const requestAuthTokenInterceptor = (req: any) => {
  if (localStorage.getItem('aengzi-auth-token')) {
    req.headers['Authorization'] =
      'Bearer ' + localStorage.getItem('aengzi-auth-token');
  }
  return req;
};

const requestBaseUrlInterceptor = (req: any) => {
  req.url = `${environment.apiUrl}/` + req.url;
  return req;
};
const requestParamInterceptor = (req: any) => {
  if (req.params) {
    _.forEach(req.params, (value, key) => {
      if (_.isArray(value)) {
        req.params[key] = value.toString();
      }
    });
  }
  return req;
};

const responseJsonParserInterceptor = (res: any) => {
  try {
    res.data = JSON.parse(res.data);
  } catch (e) {}
  return res;
};

const responseModelifyInterceptor = (res: any) => {
  const objectify = (data: any) => {
    let isModel = Array.isArray(data) ? false : true;
    let collect = isModel ? [data] : data;
    let models = _.map(collect, (item: any) => {
      let type = item._type;
      let attributes = item._attributes;
      let relations = item._relations;
      let modelClass = _.upperFirst(_.camelCase(type.split('/').pop()));
      let moduleLoader = require('src/app/model/' + type.replace(/_/g, '-'));
      let model = <Model<any, any>>new moduleLoader[modelClass]();

      _.each(attributes, (value, key) => {
        model.setAttr(key, value);
      });

      _.each(relations, (value: any, key: any) => {
        model.setRelation(key, value == null ? value : objectify(value));
      });

      return model;
    });

    return isModel ? models[0] : models;
  };

  const body = res.data;
  console.log('body', body);
  if (typeof body == 'undefined') {
    return res;
  }

  if (typeof body.errors != 'undefined') {
    for (const error in body.errors) {
      for (const error in body.errors) {
        StorageService.get('snack-bar').open(
          '⛔ ' + JSON.stringify(body.errors[error]),
          'close',
          {
            duration: 5000,
            verticalPosition: 'top',
          }
        );
      }
    }
    throw new Error(JSON.stringify(body.errors));
  }
  if (typeof body.result != 'object' || !body.result) {
  } else if (typeof body.result.data != 'undefined') {
    body.result.data = objectify(body.result.data);
  } else {
    body.result = objectify(body.result);
  }

  res.data = body.result;
  return res;
};

const setUpHttpProxy = (httpClient: any) => {
  ['get', 'post', 'put', 'patch', 'delete', 'options'].forEach((method) => {
    httpClient[method] = new Proxy(httpClient[method], {
      apply: <T>(target: any, thisArgs: any, argArray: any[]) => {
        return new Observable<T>((observer: Observer<T>) => {
          target(...argArray)
            .then((response: AxiosResponse) => {
              observer.next(response.data);
            })
            .catch((error: AxiosError | Error) => {
              observer.error(error);
            })
            .finally(() => {
              observer.complete();
            });
        });
      },
    });
  });
  return httpClient;
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  static api(): HttpClient {
    const httpClient = axios.create();
    httpClient.interceptors.request.use(requestAuthTokenInterceptor);
    httpClient.interceptors.request.use(requestBaseUrlInterceptor);
    httpClient.interceptors.request.use(requestParamInterceptor);
    httpClient.interceptors.response.use(responseJsonParserInterceptor);
    httpClient.interceptors.response.use(responseModelifyInterceptor);
    return setUpHttpProxy(httpClient);
  }
}
