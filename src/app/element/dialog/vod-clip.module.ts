import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { VodClipDialogComponent } from 'src/app/element/dialog/vod-clip.component';
import { VodPlayerModule } from 'src/app/element/vod/player.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [VodClipDialogComponent],
  exports: [VodClipDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    VodPlayerModule,
  ],
})
export class VodClipDialogModule {}
