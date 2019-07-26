import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RoutePageListModule } from 'src/app/element/route-page-list.module';
import { YoutubeVideoListComponent } from './video.component';

const routes: Routes = [{
  path: '',
  component: YoutubeVideoListComponent
}];

@NgModule({
  declarations: [
    YoutubeVideoListComponent
  ],
  exports: [
    YoutubeVideoListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RoutePageListModule,
    RouterModule.forChild(routes)
  ]
})
export class YoutubeVideoListModule { }
