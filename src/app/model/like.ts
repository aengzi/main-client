import { Model } from 'src/app/model';
import { User } from 'src/app/model/user';

export type LikeAttributes = {
  id: string,
  user_id: string,
  related_id: string,
  related_type: string,
  created_at: string
}

export type LikeRelations = {
  user: User,
  related: Model<any,any>
}

export class Like extends Model<LikeAttributes, LikeRelations> {

  public static apiBaseUrl = 'likes';
}
