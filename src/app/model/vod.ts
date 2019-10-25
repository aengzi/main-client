import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { AftvReview } from 'src/app/model/aftv-review';
import { Like } from 'src/app/model/like';

export type VodAttributes = {
  id: string,
  related_id: string,
  related_type: string,
  m3u8_url: string,
  like_count: string,
  duration: string,
  started_at: string,
  ended_at: string
}

export type VodRelations = {
  review: AftvReview,
  like: Like,
  related: Model<any,any>
}

@Injectable()
export class Vod extends Model<VodAttributes, VodRelations> {

}
