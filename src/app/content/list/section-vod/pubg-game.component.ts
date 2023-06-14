import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './pubg-game.component.html',
  styleUrls: ['./pubg-game.component.scss'],
})
export class PubgGameSectionVodListComponent implements OnDestroy {
  public is_search_open = false;
  public route: ActivatedRoute;
  public search: Params;
  public selfUrl: string;
  public setSearchSub: Subscription;

  public constructor(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.selfUrl = router.url.replace(/\?.*/, '');
    this.setSearchSub = router.events
      .pipe(filter((event: any) => event.routerEvent instanceof NavigationEnd))
      .subscribe((event) => {
        this.setSearchObj(_.merge({}, route.snapshot.queryParams));
      });
  }

  public ngOnDestroy() {
    this.setSearchSub.unsubscribe();
  }

  public toggleMapNames(type: string) {
    const index = _.indexOf(this.search.map_names, type);

    if (index == -1) {
      this.search.map_names.push(type);
    } else {
      this.search.map_names.splice(index, 1);
    }
  }

  public toggleQueueSizes(type: string) {
    const index = _.indexOf(this.search.queue_sizes, type);

    if (index == -1) {
      this.search.queue_sizes.push(type);
    } else {
      this.search.queue_sizes.splice(index, 1);
    }
  }

  public setSearchObj(search: Params) {
    if (search.order_by == undefined || search.order_by == '') {
      search.order_by = [];
    } else if (typeof search.order_by == 'string') {
      search.order_by = search.order_by.split(',');
    }

    if (search.map_names == undefined || search.map_names == '') {
      search.map_names = [];
    } else if (typeof search.map_names == 'string') {
      search.map_names = search.map_names.split(',');
    }

    if (search.queue_sizes == undefined || search.queue_sizes == '') {
      search.queue_sizes = [];
    } else if (typeof search.queue_sizes == 'string') {
      search.queue_sizes = search.queue_sizes.split(',');
    }

    this.search = search;
  }

  public getQueryParams() {
    const params = _.merge({}, this.search);

    params.page = 1;

    if (params.order_by.length != 0) {
      params.order_by = params.order_by.join(',');
    } else {
      delete params.order_by;
    }

    if (params.map_names.length != 0) {
      params.map_names = params.map_names.join(',');
    } else {
      delete params.map_names;
    }

    if (params.queue_sizes.length != 0) {
      params.queue_sizes = params.queue_sizes.join(',');
    } else {
      delete params.queue_sizes;
    }

    return params;
  }
}
