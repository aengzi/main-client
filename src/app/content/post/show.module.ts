import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LikeOrDislikeButtonGroupModule } from 'src/app/element/button/like-or-dislike-group.module';
import { UserMenuButtonModule } from 'src/app/element/button/user-menu.module';
import { CommentThreadContainerModule } from 'src/app/element/comment/thread-container.module';
import { MaterialModule } from 'src/app/material.module';
import { Post } from 'src/app/model/post';
import { HttpService } from 'src/app/service/http.service';
import { PostShowComponent } from './show.component';

const routes: Routes = [
  {
    path: '',
    component: PostShowComponent,
    resolve: {
      post: 'post$$',
    },
  },
];

@NgModule({
  declarations: [PostShowComponent],
  exports: [PostShowComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    LikeOrDislikeButtonGroupModule,
    UserMenuButtonModule,
    CommentThreadContainerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'post$$',
      useValue: (snapshot: ActivatedRouteSnapshot) => {
        return HttpService.api().get<Post>('posts/' + snapshot.params.id, {
          params: {
            expands: 'dislike, like, user',
          },
        });
      },
    },
  ],
})
export class PostShowModule {}
