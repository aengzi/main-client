import { Model } from 'src/app/model';
import { PubgMeta } from 'src/app/model/pubg-meta';
import { PubgTimeline } from 'src/app/model/pubg-timeline';
import { Vod } from 'src/app/model/vod';

export type PubgGameAttributes = {
  id: string;
  match_id: string;
  participant_id: string;
  started_at: string;
  offset: string;
  summary: string;
  match: string;
  deaths: string;
};

export type PubgGameRelations = {
  vod: Vod;
  metas: PubgMeta[];
  timelines: PubgTimeline[];
};

export class PubgGame extends Model<PubgGameAttributes, PubgGameRelations> {
  public static override apiBaseUrl = 'pubg-games';
  public static override routePageUrl = 'section/pubg-games';
}
