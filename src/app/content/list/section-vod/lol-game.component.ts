import * as _ from 'lodash';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { LolChampion } from 'src/app/model/lol-champion';
import { HttpService } from 'src/app/service/http.service';

@Component({
  templateUrl: './lol-game.component.html',
  styleUrls: ['./lol-game.component.scss']
})
export class LolGameSectionVodListComponent implements OnDestroy {

  public champions      : LolChampion[];
  public is_search_open : boolean = false;
  public route          : ActivatedRoute;
  public search         : Params;
  public selfUrl        : string;
  public setSearchSub   : Subscription;

  public constructor(route: ActivatedRoute, router: Router) {

    this.route        = route;
    this.selfUrl      = router.url.replace(/\?.*/, '');
    this.setSearchSub = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.setSearchObj(_.merge({}, route.snapshot.queryParams));
    });

    HttpService.api().get('watchable-lol-champions').subscribe((champions: any) => {
      this.champions = champions;
    });
  }

  public hasChampion(champion: LolChampion) {

    const index = _.indexOf(this.search.champion_ids, String(champion.getAttrs().id));

    if ( index == -1 ) {
      return false;
    } else {
      return true;
    }
  }

  public ngOnDestroy() {

    this.setSearchSub.unsubscribe();
  }

  public toggleChampion(champion: LolChampion) {

    const id    = String(champion.getAttrs().id);
    const index = _.indexOf(this.search.champion_ids, id);

    if ( index == -1 ) {
      this.search.champion_ids.push(id);
    } else {
      this.search.champion_ids.splice(index, 1);
    }
  }

  public hasStatusMultiKills(type: string) {

    const index = _.indexOf(this.search.multi_kill_types, type);

    if ( index == -1 ) {
      return false;
    } else {
      return true;
    }
  }

  public toggleStatusMultiKills(type: string) {

    const index = _.indexOf(this.search.multi_kill_types, type);

    if ( index == -1 ) {
      this.search.multi_kill_types.push(type);
    } else {
      this.search.multi_kill_types.splice(index, 1);
    }
  }

  public setSearchObj(search) {

    if ( search.order_by == undefined || search.order_by == '' ) {
      search.order_by = [];
    } else if ( typeof search.order_by == 'string' ) {
      search.order_by = search.order_by.split(',');
    }

    if ( search.champion_ids == undefined || search.champion_ids == '' ) {
      search.champion_ids = [];
    } else if ( typeof search.champion_ids == 'string' ) {
      search.champion_ids = search.champion_ids.split(',');
    }

    if ( search.multi_kill_types == undefined || search.multi_kill_types == '' ) {
      search.multi_kill_types = [];
    } else if ( typeof search.multi_kill_types == 'string' ) {
      search.multi_kill_types = search.multi_kill_types.split(',');
    }

    this.search = search;
  }

  public getQueryParams() {

    const params = _.merge({}, this.search);

    params.page = 1;

    if ( params.order_by.length != 0 ) {
      params.order_by = params.order_by.join(',');
    } else {
      delete params.order_by;
    }

    if ( params.champion_ids.length != 0 ) {
      params.champion_ids = params.champion_ids.join(',');
    } else {
      delete params.champion_ids;
    }

    if ( params.multi_kill_types.length != 0 ) {
      params.multi_kill_types = params.multi_kill_types.join(',');
    } else {
      delete params.multi_kill_types;
    }

    return params;
  }
}
