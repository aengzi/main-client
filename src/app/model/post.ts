import { Model } from 'src/app/model';
import { User } from 'src/app/model/user';

export type PostAttributes = {
  id: string;
  type: string;
  title: string;
  content: string;
  user_id: string;
  like_count: string;
  dislike_count: string;
  thread_count: string;
  created_at: string;
  updated_at: string;
};

export type PostRelations = {
  user: User;
};

export class Post extends Model<PostAttributes, PostRelations> {
  public static override apiBaseUrl = 'posts';
  public static override routePageUrl = 'posts';
}
