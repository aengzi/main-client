import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LikeOrDislikeButtonGroupModule } from 'src/app/element/button/like-or-dislike-group.module';
import { CommentThreadContainerModule } from 'src/app/element/comment/thread-container.module';
import { VodContainerModule } from 'src/app/element/vod-container.module';
import { VodPlayerModule } from 'src/app/element/vod/player.module';
import { MaterialModule } from 'src/app/material.module';
import { HttpService } from 'src/app/service/http.service';
import { AftvBcastVodPlayerComponent } from './aftv-bcast.component';

const routes: Routes = [
  {
    path: '',
    component: AftvBcastVodPlayerComponent,
    resolve: {
      bcast: 'bcast$$',
    },
  },
];

@NgModule({
  declarations: [AftvBcastVodPlayerComponent],
  exports: [AftvBcastVodPlayerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    VodContainerModule,
    VodPlayerModule,
    LikeOrDislikeButtonGroupModule,
    CommentThreadContainerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'bcast$$',
      useValue: (snapshot: ActivatedRouteSnapshot) => {
        return HttpService.api().get('aftv-bcasts/' + snapshot.params.id, {
          params: {
            expands: 'vod, vod.like, bj',
          },
        });
      },
    },
  ],
})
export class AftvBcastVodPlayerModule {}
