import { Injectable } from '@angular/core';
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

@Injectable()
export class Like extends Model<LikeAttributes, LikeRelations> {

  protected readonly urlPath = 'likes';

}
