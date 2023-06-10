import { Model } from 'src/app/model';

export type LolTimelineAttributes = {
  id: string;
  game_id: number;
  type: string;
  elapsed_timestamp: number;
};

export type LolTimelineRelations = {};

export class LolTimeline extends Model<
  LolTimelineAttributes,
  LolTimelineRelations
> {}
