import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserProfileComponent } from 'src/app/content/user/profile.component';
import { PageListModule } from 'src/app/element/page-list.module';
import { CommentThreadModule } from 'src/app/element/comment/thread.module';
import { CropImageDialogComponent } from 'src/app/element/dialog/crop-image.component';
import { CropImageDialogModule } from 'src/app/element/dialog/crop-image.module';

const routes: Routes = [{
  path: '',
  component: UserProfileComponent,
  resolve: {
    user: 'user$$'
  }
}];

@NgModule({
  entryComponents: [
    CropImageDialogComponent
  ],
  declarations: [
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PageListModule,
    CommentThreadModule,
    CropImageDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'user$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {
      const user = AuthService.getUser();
      if (user && (snapshot.params.id == user.getAttrs().id || snapshot.params.id == undefined)) {
        return of(user);
      } else if (snapshot.params.id != undefined) {
        return HttpService.api().get<User>('users/'+snapshot.params.id, {
          params: {
            fields: 'id,nick'
          }
        });
      }
    }
  }]
})
export class UserProfileModule { }
