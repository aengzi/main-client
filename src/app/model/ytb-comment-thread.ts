import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { YtbVideo } from 'src/app/model/ytb-video';

export type YtbCommentThreadAttributes = {
  id: string,
  etag: string,
  video_id: string,
  text: string,
  like_count: string,
  author_name: string,
  author_img_url: string,
  author_channel_id: string,
  created_at: string,
  updated_at: string
}

export type YtbCommentThreadRelations = {
  video: YtbVideo
}

@Injectable()
export class YtbCommentThread extends Model<YtbCommentThreadAttributes, YtbCommentThreadRelations> {

  public static apiBaseUrl = 'youtube/comment/threads';

}

