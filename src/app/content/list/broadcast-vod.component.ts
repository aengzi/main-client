import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './broadcast-vod.component.html',
  styleUrls: ['./broadcast-vod.component.scss'],
})
export class BroadcastVodListComponent {
  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }
}
