import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { AftvBcast } from 'src/app/model/aftv-bcast';

@Component({
  templateUrl: './broadcast-vod.component.html',
  styleUrls: ['./broadcast-vod.component.scss']
})
export class BroadcastVodListComponent {

  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

}
