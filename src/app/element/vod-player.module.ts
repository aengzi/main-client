import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { VodPlayerComponent } from './vod-player.component';
import { MaterialModule } from 'src/app/material.module';
import { VodClipDialogComponent } from 'src/app/element/dialog/vod-clip.component';
import { VodClipDialogModule } from 'src/app/element/dialog/vod-clip.module';
import { PageListModule } from 'src/app/element/page-list.module';
import { CommentThreadContainerModule } from 'src/app/element/comment/thread-container.module'
import { LikeButtonModule } from 'src/app/element/button/like.module';

@NgModule({
  entryComponents: [
    VodClipDialogComponent
  ],
  declarations: [
    VodPlayerComponent
  ],
  exports: [
    VodPlayerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PageListModule,
    VodClipDialogModule,
    LikeButtonModule,
    CommentThreadContainerModule
  ]
})
export class VodPlayerModule { }
