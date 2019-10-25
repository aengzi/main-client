import { Injectable } from '@angular/core';
import { Model } from 'src/app/model';

export type PubgTimelineAttributes = {
  id: string,
  elapsed_sec: number
}

export type PubgTimelineRelations = {
}

@Injectable()
export class PubgTimeline extends Model<PubgTimelineAttributes, PubgTimelineRelations> {

}
