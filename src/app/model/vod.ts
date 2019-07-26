import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { AftvReview } from 'src/app/model/aftv-review';
import { Like } from 'src/app/model/like';
import { Clip } from 'src/app/model/clip';

export type VodAttributes = {
  id: string,
  type: string,
  m3u8_url: string,
  like_count: string,
  duration: string,
  started_at: string,
  ended_at: string
}

export type VodRelations = {
  review: AftvReview,
  like: Like,
  clips: Clip[]
}

@Injectable()
export class Vod extends Model<VodAttributes, VodRelations> {

  protected readonly urlPath = 'vods';

}
