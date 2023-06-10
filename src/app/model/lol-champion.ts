import { Model } from 'src/app/model';

export type LolChampionAttributes = {
  id: string;
  key: string;
  name: string;
};

export type LolChampionRelations = {};

export class LolChampion extends Model<
  LolChampionAttributes,
  LolChampionRelations
> {
  public static override apiBaseUrl = 'lol-champions';
}
