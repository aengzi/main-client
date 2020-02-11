import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

export type ModelAttribute = {
  [k: string]: string | number | undefined
}

export type ModelRelations = {
  [k: string]:
    Model<ModelAttribute, ModelRelations> |
    Model<ModelAttribute, ModelRelations>[] |
    undefined
}

export class Model<T extends ModelAttribute, R extends ModelRelations> {

  public static apiBaseUrl   : string;
  public static routePageUrl : string;
  protected attrs            : T = <T>{};
  protected relations        : R = <R>{};
  public isExist             : boolean = true;
  public isNew               : boolean = false;

  constructor(attrs: ModelAttribute = {}) {

    this.attrs = <T>attrs;
  }

  public getAttr(key: keyof ModelAttribute) {

    return this.attrs[key];
  }

  public getAttrs(): T {

    return this.attrs;
  }

  public getModelType() {

    return _.snakeCase(this.constructor.name);
  }

  public setAttr(key: keyof ModelAttribute, value: string): void {

    _.set(this.attrs, key, value);
  }

  public setAttrs(attrs: ModelAttribute) {

    _.forEach(attrs, (val, key) => {
      this.setAttr(key, val);
    });
  }

  public getRelation(key: keyof ModelRelations): Model<ModelAttribute, ModelRelations> | Model<ModelAttribute, ModelRelations>[] {

    const keys     = _.split(key, '.');
    const relation = this.relations[keys.shift()];

    if ( keys.length == 0 ) {
      return relation;
    } else if ( relation instanceof Array ) {
      return _.map(relation, (model) => model.getRelation(keys.join('.')));
    } else {
      return relation.getRelation(keys.join('.'));
    }
  }

  public getRelations(): R {

    return this.relations;
  }

  public setRelation(key: keyof ModelRelations, value: Model<ModelAttribute, ModelRelations> | Model<ModelAttribute, ModelRelations>[]): void {

    _.set(this.relations, key, value);
  }

  public static create$(params: HttpParams, pathPrefix='') {

    return HttpService.api().post(pathPrefix+this.apiBaseUrl, params).pipe(
      map((model: Model<any,any>) => {

        model.isNew = true;
        return model;
      })
    );
  }

  public delete$() {

    return HttpService.api().delete((this.constructor as typeof Model).apiBaseUrl+'/'+this.getAttrs().id).pipe(
      map(() => {
        this.isExist = false;
      })
    );
  }

  public static find$(id, params: HttpParams) {

    return HttpService.api().patch(this.apiBaseUrl+'/'+id, {
      params: params
    });
  }

  public static get$(params: HttpParams, pathPrefix='') {

    return HttpService.api().get(pathPrefix+this.apiBaseUrl, {
      params: params
    });
  }

  public load$(params: HttpParams) {

    return HttpService.api().get((this.constructor as typeof Model).apiBaseUrl+'/'+this.getAttrs().id, {
      params: params
    }).pipe(
      map((model: Model<any,any>) => {

        _.forEach(model.getAttrs(), (value, key) => {
          this.setAttr(key, value);
        });
        _.forEach(model.getRelations(), (value, key) => {
          this.setRelation(key, value);
        });
        return this;
      })
    );
  }

  public update$(params) {

    return HttpService.api().patch((this.constructor as typeof Model).apiBaseUrl+'/'+this.getAttrs().id, params);
  }

  public navigate() {
    StorageService.get('router').navigate(['/'+(this.constructor as typeof Model).routePageUrl+'/'+this.getAttrs().id]);
  }
}
