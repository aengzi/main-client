import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';
import { Vod } from 'src/app/model/vod';
import { LolMeta } from 'src/app/model/lol-meta';
import { LolTimeline } from 'src/app/model/lol-timeline';

export type PubgGameAttributes = {
  id: string,
  match_id: string,
  participant_id: string,
  started_at: string,
  offset: string,
  summary: string,
  match: string,
  deaths: string
}

export type PubgGameRelations = {
  vod: Vod
  metas: LolMeta[],
  timelines: LolTimeline[]
}

@Injectable()
export class PubgGame extends Model<PubgGameAttributes, PubgGameRelations> {

  public static apiBaseUrl = 'pubg-games';
  public static routePageUrl = 'section/pubg-games';
}
