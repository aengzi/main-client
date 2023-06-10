import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { LikeOrDislikeButtonGroupComponent } from './like-or-dislike-group.component';

@NgModule({
  declarations: [LikeOrDislikeButtonGroupComponent],
  exports: [LikeOrDislikeButtonGroupComponent],
  imports: [CommonModule, MaterialModule],
})
export class LikeOrDislikeButtonGroupModule {}
