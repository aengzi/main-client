import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeVodPlayerComponent } from './youtube.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LikeButtonModule } from 'src/app/element/button/like.module';
import { HttpService } from 'src/app/service/http.service';
import { CommentThreadContainerModule } from 'src/app/element/comment/thread-container.module'

const routes: Routes = [{
  path: '',
  component: YoutubeVodPlayerComponent,
  resolve: {
    video: 'video$$'
  }
}];

@NgModule({
  declarations: [
    YoutubeVodPlayerComponent
  ],
  exports: [
    YoutubeVodPlayerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LikeButtonModule,
    CommentThreadContainerModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'video$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get('youtube-videos/'+snapshot.params.id, {
        params: {
          expands: 'like'
        }
      });
    }
  }]
})
export class YoutubeVodPlayerModule { }
