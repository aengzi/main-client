import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { VodClipDialogComponent } from 'src/app/element/dialog/vod-clip.component';
import { VodPlayerModule } from 'src/app/element/vod/player.module';

@NgModule({
  declarations: [
    VodClipDialogComponent
  ],
  exports: [
    VodClipDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    VodPlayerModule
  ]
})
export class VodClipDialogModule { }
