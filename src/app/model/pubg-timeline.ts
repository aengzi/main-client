import { Model } from 'src/app/model';

export type PubgTimelineAttributes = {
  id: string,
  elapsed_sec: number
}

export type PubgTimelineRelations = {
}

export class PubgTimeline extends Model<PubgTimelineAttributes, PubgTimelineRelations> {

}
