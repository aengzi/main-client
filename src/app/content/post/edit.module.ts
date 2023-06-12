import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { PostEditComponent } from './edit.component';

const routes: Routes = [
  {
    path: '',
    component: PostEditComponent,
    resolve: {
      post: 'post$$',
    },
    canActivate: ['canActivate$$'],
  },
];

@NgModule({
  declarations: [PostEditComponent],
  exports: [PostEditComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'post$$',
      useValue: (snapshot: ActivatedRouteSnapshot) => {
        return HttpService.api()
          .get<Post>('posts/' + snapshot.params.id, {
            params: {
              expands: 'user',
            },
          })
          .pipe(map(({ result: post }) => post));
      },
    },
    {
      provide: 'canActivate$$',
      deps: ['post$$', 'auth$$'],
      useFactory: (post$$: any, auth$$: any) => {
        return (snapshot: ActivatedRouteSnapshot) => {
          return forkJoin<{
            post: Observable<Post>;
            authUser: Observable<User>;
          }>({
            post: post$$(snapshot),
            authUser: auth$$(snapshot),
          }).pipe(
            map((arr) => {
              const post = arr['post'];
              const authUser = arr['authUser'];
              return post.getAttrs().user_id == authUser.getAttrs().id;
            })
          );
        };
      },
    },
  ],
})
export class PostEditModule {}
