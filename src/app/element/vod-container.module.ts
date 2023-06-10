import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LikeButtonModule } from 'src/app/element/button/like.module';
import { CommentThreadContainerModule } from 'src/app/element/comment/thread-container.module';
import { VodClipDialogModule } from 'src/app/element/dialog/vod-clip.module';
import { MaterialModule } from 'src/app/material.module';
import { VodContainerComponent } from './vod-container.component';

@NgModule({
  declarations: [VodContainerComponent],
  exports: [VodContainerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    VodClipDialogModule,
    LikeButtonModule,
    CommentThreadContainerModule,
  ],
})
export class VodContainerModule {}
