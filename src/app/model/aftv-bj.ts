import { Model } from 'src/app/model';
import { AftvBcast } from 'src/app/model/aftv-bcast';

export type AftvBjAttributes = {
  id: string;
  nick: string;
  station_id: string;
  bbs_id: string;
};

export type AftvBjRelations = {
  bcasts: AftvBcast[];
};

export class AftvBj extends Model<AftvBjAttributes, AftvBjRelations> {}
