import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { Like } from 'src/app/model/like';

export type YtbVideoAttributes = {
  id: string,
  ytb_id: string,
  channel_id: string,
  title: string,
  created_at: string
}

export type YtbVideoRelations = {
  like: Like
}

@Injectable()
export class YtbVideo extends Model<YtbVideoAttributes, YtbVideoRelations> {

  protected readonly urlPath = 'youtube/videos';

}
