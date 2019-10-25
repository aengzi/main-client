import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';

export type UserAttributes = {
  id: string,
  nick: string,
  email: string,
  password: string,
  created_at: string,
  thumbnail: string
}

export type UserRelations = {
}

@Injectable()
export class User extends Model<UserAttributes, UserRelations> {

  public static apiBaseUrl = 'users';

}
