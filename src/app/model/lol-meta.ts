import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';

export type LolMetaAttributes = {
  id: string
}

export type LolMetaRelations = {
}

@Injectable()
export class LolMeta extends Model<LolMetaAttributes, LolMetaRelations> {

  protected readonly urlPath = 'lol-metas';

}
