import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserProfileComponent } from 'src/app/content/user/profile.component';
import { CommentThreadModule } from 'src/app/element/comment/thread.module';
import { CropImageDialogModule } from 'src/app/element/dialog/crop-image.module';
import { PageListModule } from 'src/app/element/page-list.module';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    resolve: {
      user: 'user$$',
    },
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PageListModule,
    CommentThreadModule,
    CropImageDialogModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'user$$',
      useValue: (snapshot: ActivatedRouteSnapshot): Observable<User> | null => {
        const user = AuthService.getUser();
        if (
          user &&
          (snapshot.params.id == user.getAttrs().id ||
            snapshot.params.id == undefined)
        ) {
          return of(user);
        } else if (snapshot.params.id != undefined) {
          return HttpService.api().get<User>('users/' + snapshot.params.id, {
            params: {
              fields: 'id,nick',
            },
          });
        }

        return null;
      },
    },
  ],
})
export class UserProfileModule {}
