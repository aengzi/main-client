import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { PostEditComponent } from './edit.component';

const routes: Routes = [{
  path: '',
  component: PostEditComponent,
  resolve: {
    post: 'post$$'
  },
  canActivate: ['canActivate$$']
}];

@NgModule({
  declarations: [
    PostEditComponent
  ],
  exports: [
    PostEditComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'post$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get<Post>('posts/'+snapshot.params.id, {
        params: {
          expands: 'user'
        }
      });
    }
  }, {
    provide: 'canActivate$$',
    deps: ['post$$', 'auth$$'],
    useFactory: (post$$, auth$$) => {

      return (snapshot: ActivatedRouteSnapshot) => {
        return forkJoin<Post, User>([
          post$$(snapshot),
          auth$$(snapshot)
        ]).pipe(
          map(([post, authUser]) => {

            return post.getAttrs().user_id == authUser.getAttrs().id;
          })
        )
      }
    }
  }]
})
export class PostEditModule { }
