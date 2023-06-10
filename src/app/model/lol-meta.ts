import { Model } from 'src/app/model';

export type LolMetaAttributes = {
  id: string;
};

export type LolMetaRelations = {};

export class LolMeta extends Model<LolMetaAttributes, LolMetaRelations> {}
