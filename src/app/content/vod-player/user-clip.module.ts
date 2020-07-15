import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UserClipVodPlayerComponent } from './user-clip.component';
import { HttpService } from 'src/app/service/http.service';
import { VodContainerModule } from 'src/app/element/vod-container.module';
import { VodPlayerModule } from 'src/app/element/vod/player.module';

const routes: Routes = [{
  path: '',
  component: UserClipVodPlayerComponent,
  resolve: {
    clip: 'clip$$'
  }
}];

@NgModule({
  declarations: [
    UserClipVodPlayerComponent
  ],
  exports: [
    UserClipVodPlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VodContainerModule,
    VodPlayerModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'clip$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get('clips/'+snapshot.params.id, {
        params: {
          expands: 'vod.like, vod.bcast.bj, vod.like, user'
        }
      });
    }
  }]
})
export class UserClipVodPlayerModule { }
