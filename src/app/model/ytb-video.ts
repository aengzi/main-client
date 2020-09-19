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

export class YtbVideo extends Model<YtbVideoAttributes, YtbVideoRelations> {

  public static apiBaseUrl = 'youtube-videos';
  public static routePageUrl = 'youtube/videos';
}
