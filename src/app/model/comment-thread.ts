import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { Dislike } from 'src/app/model/dislike';
import { Like } from 'src/app/model/like';
import { User } from 'src/app/model/user';

export type CommentThreadAttributes = {
  id: string,
  related_id: string,
  related_type: string,
  user_id: string,
  message: string,
  like_count: number,
  dislike_count: number,
  reply_count: number,
  created_at: string,
  updated_at: string
}

export type CommentThreadRelations = {
  dislike: Dislike,
  like: Like,
  user: User
}

@Injectable()
export class CommentThread extends Model<CommentThreadAttributes, CommentThreadRelations> {

  protected readonly urlPath = 'comment-threads';

}
