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

export class Clip extends Model<ClipAttributes, ClipRelations> {

  public static apiBaseUrl   = 'clips';
  public static routePageUrl = 'clips';
}
