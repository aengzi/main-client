import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { User } from 'src/app/model/user';

export type DislikeAttributes = {
  id: string,
  user_id: string,
  related_id: string,
  related_type: string,
  created_at: string
}

export type DislikeRelations = {
  user: User,
  related: Model<any,any>
}

@Injectable()
export class Dislike extends Model<DislikeAttributes, DislikeRelations> {

  protected readonly urlPath = 'dislikes';

}
