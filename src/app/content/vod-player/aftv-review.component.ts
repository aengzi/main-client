import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { AftvReview } from 'src/app/model/aftv-review';
import { AftvBcast } from 'src/app/model/aftv-bcast';
import { VodPlayerComponent } from 'src/app/element/vod-player.component';

@Component({
  templateUrl: './aftv-review.component.html',
  styleUrls: ['./aftv-review.component.scss']
})
export class AftvReviewVodPlayerComponent {

  public review    : AftvReview;
  public bcast     : AftvBcast;
  public iframeUrl : SafeResourceUrl;
  public routerSub : Subscription;
  @ViewChild(VodPlayerComponent, {static: false})
  public vodPlayer : VodPlayerComponent

  public constructor(route: ActivatedRoute, router: Router, sanitizer: DomSanitizer) {

    this.routerSub   = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {

      const review   = route.snapshot.data.review;

      this.bcast     = review.getRelations().bcast;
      this.review    = review;
      this.iframeUrl = sanitizer.bypassSecurityTrustResourceUrl(review.getAttrs().iframe_url);

      if ( this.vodPlayer ) {
        this.vodPlayer.init(this.review.getRelations().vod);
      }
    });
  }

  public ngAfterViewInit()
  {
    this.vodPlayer.init(this.review.getRelations().vod);
  }

  public ngOnDestroy() {

    this.routerSub.unsubscribe();
  }
}
