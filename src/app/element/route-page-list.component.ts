import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/index';
import { PageListComponent } from 'src/app/element/page-list.component';

@Component({
  selector: 'route-page-list',
  templateUrl: './route-page-list.component.html',
  styleUrls: ['./route-page-list.component.scss']
})
export class RoutePageListComponent extends PageListComponent implements OnInit, OnDestroy {

  public pageUrl: string;
  public route: ActivatedRoute;
  public router: Router;
  public subscription: Subscription;

  public constructor(route: ActivatedRoute, router: Router) {
    super();
    this.pageUrl = router.url.replace(/\?.*/, '');
    this.router  = router;
    this.route   = route;
  }

  public ngOnInit() {
    this.getListWith(this.route.snapshot.queryParams);
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.getListWith(this.route.snapshot.queryParams);
    });
  }

  public ngOnDestroy() {

    this.subscription.unsubscribe();
  }
}
