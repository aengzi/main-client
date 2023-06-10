import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { PageListModule } from 'src/app/element/page-list.module';
import { MaterialModule } from 'src/app/material.module';
import { YoutubeComponent } from './youtube.component';

const routes: Routes = [
  {
    path: '',
    component: YoutubeComponent,
    children: [
      {
        path: 'videos',
        loadChildren: () =>
          import('src/app/content/list/youtube/video.module').then(
            (mod) => mod.YoutubeVideoListModule
          ),
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('src/app/content/list/youtube/comment.module').then(
            (mod) => mod.YoutubeCommentListModule
          ),
      },
      {
        path: '',
        redirectTo: 'videos',
      },
    ],
  },
];

@NgModule({
  declarations: [YoutubeComponent],
  exports: [YoutubeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PageListModule,
    RouterModule.forChild(routes),
  ],
})
export class YoutubeModule {}
