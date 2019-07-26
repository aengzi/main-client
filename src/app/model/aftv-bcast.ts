import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { AftvBj } from 'src/app/model/aftv-bj';
import { AftvReview } from 'src/app/model/aftv-review';

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
  reviews: AftvReview[]
}

@Injectable()
export class AftvBcast extends Model<AftvBcastAttributes, AftvBcastRelations> {

  protected readonly urlPath = 'aftv-bcasts';

}
