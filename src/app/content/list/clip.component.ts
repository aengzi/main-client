import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipListComponent implements OnDestroy {
  public route: ActivatedRoute;
  public search: Params;
  public setSearchSub: Subscription;
  public authService: typeof AuthService;

  public constructor(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.setSearchSub = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.search = _.merge({}, route.snapshot.queryParams);
      });
    this.authService = AuthService;
  }

  public ngOnDestroy() {
    this.setSearchSub.unsubscribe();
  }
}
