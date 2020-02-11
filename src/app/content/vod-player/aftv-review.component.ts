import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { AftvReview } from 'src/app/model/aftv-review';
import { AftvBcast } from 'src/app/model/aftv-bcast';
import { VodContainerComponent } from 'src/app/element/vod-container.component';

@Component({
  templateUrl: './aftv-review.component.html',
  styleUrls: ['./aftv-review.component.scss']
})
export class AftvReviewVodPlayerComponent {

  public review    : AftvReview;
  public bcast     : AftvBcast;
  public routerSub : Subscription;
  @ViewChild(VodContainerComponent, {static: false})
  public vodContainer : VodContainerComponent

  public constructor(route: ActivatedRoute, router: Router) {

    this.routerSub   = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {

      const review   = route.snapshot.data.review;

      this.bcast     = review.getRelations().bcast;
      this.review    = review;
    });
  }

  public ngOnDestroy() {

    this.routerSub.unsubscribe();
  }
}
