import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PageListModule } from 'src/app/element/page-list.module';
import { MaterialModule } from 'src/app/material.module';
import { CommentThreadModule } from 'src/app/element/comment/thread.module';
import { CommentThreadContainerComponent } from './thread-container.component';

@NgModule({
  declarations: [
    CommentThreadContainerComponent
  ],
  exports: [
    CommentThreadContainerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CommentThreadModule,
    ReactiveFormsModule,
    PageListModule
  ]
})
export class CommentThreadContainerModule { }
