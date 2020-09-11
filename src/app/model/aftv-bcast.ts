import { Model } from 'src/app/model';
import { AftvBj } from 'src/app/model/aftv-bj';
import { Vod } from 'src/app/model/vod';

export type AftvBcastAttributes = {
  id: string,
  bj_user_id: string,
  duration: string,
  started_at: string,
  ended_at: string,
  thumbnail: string
}

export type AftvBcastRelations = {
  bj: AftvBj,
  vod: Vod
}

export class AftvBcast extends Model<AftvBcastAttributes, AftvBcastRelations> {

}
