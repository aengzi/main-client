import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { User } from 'src/app/model/user';
import { Vod } from 'src/app/model/vod';

export type ClipAttributes = {
  id: string,
  user_id: string,
  created_at: string
}

export type ClipRelations = {
  user: User,
  vod: Vod
}

@Injectable()
export class Clip extends Model<ClipAttributes, ClipRelations> {

  public static apiBaseUrl   = 'clips';
  public static routePageUrl = 'user/clips';
}
