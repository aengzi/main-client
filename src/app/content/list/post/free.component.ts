import * as _ from 'lodash';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { RoutePageListComponent } from 'src/app/element/route-page-list.component';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.scss']
})
export class FreePostListComponent {

  @ViewChild('pageList', {static: false})
  public pageList     : RoutePageListComponent;
  public search       : Params;
  public setSearchSub : Subscription;
  public authService  : AuthService;
  public url          : string;

  public constructor(route: ActivatedRoute, router: Router, authService: AuthService) {

    this.authService  = authService;
    this.setSearchSub = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.url    = router.url;
      this.search = _.merge({}, route.snapshot.queryParams);
    });
  }

  public ngOnDestroy() {

    this.setSearchSub.unsubscribe();
  }

}
