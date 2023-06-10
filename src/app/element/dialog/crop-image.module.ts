import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CropImageDialogComponent } from 'src/app/element/dialog/crop-image.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [CropImageDialogComponent],
  exports: [CropImageDialogComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
})
export class CropImageDialogModule {}
