import { Model } from 'src/app/model';

export type PubgMetaAttributes = {
  id: string;
};

export type PubgMetaRelations = {};

export class PubgMeta extends Model<PubgMetaAttributes, PubgMetaRelations> {}
