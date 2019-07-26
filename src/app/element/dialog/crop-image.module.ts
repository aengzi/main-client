import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { CropImageDialogComponent } from 'src/app/element/dialog/crop-image.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CropImageDialogComponent
  ],
  exports: [
    CropImageDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ]
})
export class CropImageDialogModule { }
