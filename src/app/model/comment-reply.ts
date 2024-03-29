import { Model } from 'src/app/model';
import { CommentThread } from 'src/app/model/comment-thread';
import { User } from 'src/app/model/user';

export type CommentReplyAttributes = {
  id: string;
  thread_id: string;
  user_id: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export type CommentReplyRelations = {
  user: User;
  thread: CommentThread;
};

export class CommentReply extends Model<
  CommentReplyAttributes,
  CommentReplyRelations
> {
  public static override apiBaseUrl = 'comment-replies';
}
