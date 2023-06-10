import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { VodContainerComponent } from 'src/app/element/vod-container.component';
import { AftvBcast } from 'src/app/model/aftv-bcast';

@Component({
  templateUrl: './aftv-bcast.component.html',
  styleUrls: ['./aftv-bcast.component.scss'],
})
export class AftvBcastVodPlayerComponent {
  public bcast: AftvBcast;
  public routerSub: Subscription;
  @ViewChild(VodContainerComponent)
  public vodContainer: VodContainerComponent;

  public constructor(route: ActivatedRoute, router: Router) {
    this.routerSub = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.bcast = route.snapshot.data.bcast;
      });
  }

  public ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
