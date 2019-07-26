import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http.service';

export type ModelAttribute = {
  [k: string]: string | number | undefined
}

export type ModelRelations = {
  [k: string]:
    Model<ModelAttribute, ModelRelations> |
    Model<ModelAttribute, ModelRelations>[] |
    undefined
}

@Injectable()
export class Model<T extends ModelAttribute, R extends ModelRelations> {

  protected urlPath   : string;
  protected attrs     : T = <T>{};
  protected relations : R = <R>{};
  public isExist      : boolean = true;
  public isNew        : boolean = false;

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

  public load$(params: HttpParams): Observable<any> {

    return HttpService.api().get<Model<T,R>>(`${this.urlPath}/${this.attrs.id}`, {
      params: params
    }).pipe(
      map((model: Model<T,R>) => {

        _.forEach(model.getAttrs(), (value, key) => {
          this.setAttr(key, value);
        });
        _.forEach(model.getRelations(), (value, key) => {
          this.setRelation(key, value);
        });
      })
    );
  }

  public load(params: HttpParams): void {

    this.load$(params).subscribe();
  }

}
