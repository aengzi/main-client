import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

export type ModelAttribute = {
  [k: string]: string | number | undefined;
};

export type ModelRelations = {
  [k: string]:
    | Model<ModelAttribute, ModelRelations>
    | Model<ModelAttribute, ModelRelations>[]
    | undefined;
};

export class Model<T extends ModelAttribute, R extends ModelRelations> {
  public static apiBaseUrl: string;
  public static routePageUrl: string;
  protected attrs: T = <T>{};
  protected relations: R = <R>{};
  public isExist = true;
  public isNew = false;

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
    _.forEach(attrs, (val: any, key) => {
      this.setAttr(key, val);
    });
  }

  public getRelation(
    key: keyof ModelRelations
  ):
    | Model<ModelAttribute, ModelRelations>
    | Model<ModelAttribute, ModelRelations>[]
    | undefined {
    const keys = _.split(<string>key, '.');
    const relation = this.relations[<string>keys.shift()];

    if (!relation) {
      return relation;
    }

    if (keys.length === 0) {
      return relation;
    } else if (relation instanceof Array) {
      return <Model<ModelAttribute, ModelRelations>[]>(
        _.map(relation, (model) => model.getRelation(keys.join('.')))
      );
    } else {
      return relation.getRelation(keys.join('.'));
    }
  }

  public getRelations(): R {
    return this.relations;
  }

  public setRelation(
    key: keyof ModelRelations,
    value:
      | Model<ModelAttribute, ModelRelations>
      | Model<ModelAttribute, ModelRelations>[]
  ): void {
    _.set(this.relations, key, value);
  }

  public static create$(params: HttpParams, pathPrefix = '') {
    return HttpService.api()
      .post<Model<any, any>>(pathPrefix + this.apiBaseUrl, params)
      .pipe(
        map(({ result: model }) => {
          model.isNew = true;
          return model;
        })
      );
  }

  public delete$() {
    return HttpService.api()
      .delete(
        (this.constructor as typeof Model).apiBaseUrl + '/' + this.getAttrs().id
      )
      .pipe(
        map(() => {
          this.isExist = false;
        })
      );
  }

  public static find$(id: number, params: HttpParams) {
    return HttpService.api().patch(this.apiBaseUrl + '/' + id, {
      params: params,
    });
  }

  public static get$(params: HttpParams, pathPrefix = '') {
    return HttpService.api().get(pathPrefix + this.apiBaseUrl, {
      params: params,
    });
  }

  public load$(params: HttpParams) {
    return HttpService.api()
      .get<Model<any, any>>(
        (this.constructor as typeof Model).apiBaseUrl +
          '/' +
          this.getAttrs().id,
        {
          params: params,
        }
      )
      .pipe(
        map(({ result: model }) => {
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

  public update$(params: Params) {
    return HttpService.api().patch(
      (this.constructor as typeof Model).apiBaseUrl + '/' + this.getAttrs().id,
      params
    );
  }

  public navigate() {
    StorageService.get('router').navigate([
      '/' +
        (this.constructor as typeof Model).routePageUrl +
        '/' +
        this.getAttrs().id,
    ]);
  }
}
