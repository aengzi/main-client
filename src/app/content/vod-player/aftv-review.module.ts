import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AftvReviewVodPlayerComponent } from './aftv-review.component';
import { HttpService } from 'src/app/service/http.service';
import { VodPlayerModule } from 'src/app/element/vod-player.module';
import { LikeOrDislikeButtonGroupModule } from 'src/app/element/button/like-or-dislike-group.module';
import { CommentThreadContainerModule } from 'src/app/element/comment/thread-container.module'
import { SafePipe } from 'src/app/pipe/safe.pipe';

const routes: Routes = [{
  path: '',
  component: AftvReviewVodPlayerComponent,
  resolve: {
    review: 'review$$'
  }
}];

@NgModule({
  declarations: [
    AftvReviewVodPlayerComponent,
    SafePipe
  ],
  exports: [
    AftvReviewVodPlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VodPlayerModule,
    LikeOrDislikeButtonGroupModule,
    CommentThreadContainerModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'review$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get('aftv-reviews/'+snapshot.params.id, {
        params: {
          expands: 'bcast.reviews.vod, vod.like, bj'
        }
      });
    }
  }]
})
export class AftvReviewVodPlayerModule { }
