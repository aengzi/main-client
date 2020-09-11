import { Model } from 'src/app/model';
import { YtbCommentThread } from 'src/app/model/ytb-comment-thread';

export type YtbCommentReplyAttributes = {
  id: string,
  etag: string,
  thread_id: string,
  text: string,
  like_count: string,
  author_name: string,
  author_img_url: string,
  author_channel_id: string,
  created_at: string,
  updated_at: string
}

export type YtbCommentReplyRelations = {
  thread: YtbCommentThread
}

export class YtbCommentReply extends Model<YtbCommentReplyAttributes, YtbCommentReplyRelations> {

  public static apiBaseUrl = 'youtube/comment/replies';
}
