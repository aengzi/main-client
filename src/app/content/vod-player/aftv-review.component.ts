import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { AftvReview } from 'src/app/model/aftv-review';

@Component({
  templateUrl: './aftv-review.component.html',
  styleUrls: ['./aftv-review.component.scss']
})
export class AftvReviewVodPlayerComponent {

  public review;
  public bcast;

  public constructor(route: ActivatedRoute) {

    this.review  = route.snapshot.data.review;
    this.bcast   = this.review.getRelations().bcast;
  }

}
