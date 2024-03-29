import { Model } from 'src/app/model';
import { AftvBcast } from 'src/app/model/aftv-bcast';
import { AftvBj } from 'src/app/model/aftv-bj';
import { Vod } from 'src/app/model/vod';

export type AftvReviewAttributes = {
  id: string;
  info: string;
  bj_user_id: string;
  bcast_id: string;
  duration: string;
  registered_at: string;
  started_at: string;
  ended_at: string;
};

export type AftvReviewRelations = {
  bcast: AftvBcast;
  bj: AftvBj;
  vod: Vod;
};

export class AftvReview extends Model<
  AftvReviewAttributes,
  AftvReviewRelations
> {
  public static override apiBaseUrl = 'aftv-reviews';
  public static override routePageUrl = 'aftv-reviews';
}
