import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';

export type PubgMetaAttributes = {
  id: string
}

export type PubgMetaRelations = {
}

@Injectable()
export class PubgMeta extends Model<PubgMetaAttributes, PubgMetaRelations> {

  protected readonly urlPath = 'pubg-metas';

}
