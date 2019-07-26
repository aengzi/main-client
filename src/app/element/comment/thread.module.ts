import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommentReplyModule } from 'src/app/element/comment/reply.module';
import { CommentThreadComponent } from './thread.component';
import { UserMenuButtonModule } from 'src/app/element/button/user-menu.module'

@NgModule({
  declarations: [
    CommentThreadComponent
  ],
  exports: [
    CommentThreadComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    CommentReplyModule,
    UserMenuButtonModule
  ]
})
export class CommentThreadModule { }
