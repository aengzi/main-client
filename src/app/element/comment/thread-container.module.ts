import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommentThreadModule } from 'src/app/element/comment/thread.module';
import { PageListModule } from 'src/app/element/page-list.module';
import { MaterialModule } from 'src/app/material.module';
import { CommentThreadContainerComponent } from './thread-container.component';

@NgModule({
  declarations: [CommentThreadContainerComponent],
  exports: [CommentThreadContainerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CommentThreadModule,
    ReactiveFormsModule,
    RouterModule,
    PageListModule,
  ],
})
export class CommentThreadContainerModule {}
