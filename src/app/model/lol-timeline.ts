import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';

export type LolTimelineAttributes = {
  id: string,
  elapsed_timestamp: number
}

export type LolTimelineRelations = {
}

@Injectable()
export class LolTimeline extends Model<LolTimelineAttributes, LolTimelineRelations> {

}
