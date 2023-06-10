import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { VodContainerModule } from 'src/app/element/vod-container.module';
import { VodPlayerModule } from 'src/app/element/vod/player.module';
import { MaterialModule } from 'src/app/material.module';
import { HttpService } from 'src/app/service/http.service';
import { ClipVodPlayerComponent } from './clip.component';

const routes: Routes = [
  {
    path: '',
    component: ClipVodPlayerComponent,
    resolve: {
      clip: 'clip$$',
    },
  },
];

@NgModule({
  declarations: [ClipVodPlayerComponent],
  exports: [ClipVodPlayerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    VodContainerModule,
    VodPlayerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'clip$$',
      useValue: (snapshot: ActivatedRouteSnapshot) => {
        return HttpService.api().get('clips/' + snapshot.params.id, {
          params: {
            expands: 'vod.like, vod.bcast.bj, vod.like, user',
          },
        });
      },
    },
  ],
})
export class ClipVodPlayerModule {}
