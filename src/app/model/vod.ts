import { Model } from 'src/app/model';
import { AftvBcast } from 'src/app/model/aftv-bcast';
import { Like } from 'src/app/model/like';

export type VodAttributes = {
  id: string,
  related_id: string,
  related_type: string,
  bcast_id: string,
  m3u8_url: string,
  title: string,
  like_count: string,
  duration: string,
  started_at: string,
  ended_at: string
}

export type VodRelations = {
  bcast: AftvBcast,
  like: Like,
  related: Model<any,any>
}

export class Vod extends Model<VodAttributes, VodRelations> {

}
