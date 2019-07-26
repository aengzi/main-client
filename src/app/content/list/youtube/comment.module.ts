import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RoutePageListModule } from 'src/app/element/route-page-list.module';
import { YoutubeCommentListComponent } from './comment.component';

const routes: Routes = [{
  path: '',
  component: YoutubeCommentListComponent
}];

@NgModule({
  declarations: [
    YoutubeCommentListComponent
  ],
  exports: [
    YoutubeCommentListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RoutePageListModule,
    RouterModule.forChild(routes)
  ]
})
export class YoutubeCommentListModule { }
