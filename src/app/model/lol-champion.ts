import { Model } from 'src/app/model';

export type LolChampionAttributes = {
  id: string,
  created_at: string
}

export type LolChampionRelations = {
}

export class LolChampion extends Model<LolChampionAttributes, LolChampionRelations> {

  public static apiBaseUrl = 'lol-champions';
}
