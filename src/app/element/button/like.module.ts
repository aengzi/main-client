import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { LikeButtonComponent } from './like.component';

@NgModule({
  declarations: [LikeButtonComponent],
  exports: [LikeButtonComponent],
  imports: [CommonModule, MaterialModule],
})
export class LikeButtonModule {}
