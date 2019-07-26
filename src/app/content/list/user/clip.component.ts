import * as _ from 'lodash';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss']
})
export class UserClipListComponent implements OnDestroy {

  public route: ActivatedRoute;
  public search: Params;
  public setSearchSub: Subscription;

  public constructor(route: ActivatedRoute, router: Router) {

    this.route        = route;
    this.setSearchSub = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.search = _.merge({}, route.snapshot.queryParams);
    });
  }

  public ngOnDestroy() {

    this.setSearchSub.unsubscribe();
  }
}
