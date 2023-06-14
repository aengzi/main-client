import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { PageListComponent } from 'src/app/element/page-list.component';

@Component({
  selector: 'route-page-list',
  templateUrl: './route-page-list.component.html',
  styleUrls: ['./route-page-list.component.scss'],
})
export class RoutePageListComponent
  extends PageListComponent
  implements OnInit, OnDestroy
{
  public pageUrl: string;
  public route: ActivatedRoute;
  public router: Router;
  public subscription: Subscription;

  public constructor(route: ActivatedRoute, router: Router) {
    super();
    this.pageUrl = router.url.replace(/\?.*/, '');
    this.router = router;
    this.route = route;
  }

  public override ngOnInit() {
    this.getListWith(this.route.snapshot.queryParams);
    this.subscription = this.router.events
      .pipe(filter((event: any) => event.routerEvent instanceof NavigationEnd))
      .subscribe((event) => {
        this.getListWith(this.route.snapshot.queryParams);
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
