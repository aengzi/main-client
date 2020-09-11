import { Model } from 'src/app/model';
import { Vod } from 'src/app/model/vod';
import { LolMeta } from 'src/app/model/lol-meta';
import { LolTimeline } from 'src/app/model/lol-timeline';

export type LolGameAttributes = {
  id: string,
  started_at: string,
  matches: string,
  participant_id: string,
  created_at: string
}

export type LolGameRelations = {
  vod: Vod
  metas: LolMeta[],
  timelines: LolTimeline[]
}

export class LolGame extends Model<LolGameAttributes, LolGameRelations> {

  public static apiBaseUrl = 'lol-games';
  public static routePageUrl = 'section/lol-games';
}
