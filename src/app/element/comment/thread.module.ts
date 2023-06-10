import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { UserMenuButtonModule } from 'src/app/element/button/user-menu.module';
import { CommentReplyModule } from 'src/app/element/comment/reply.module';
import { MaterialModule } from 'src/app/material.module';
import { CommentThreadComponent } from './thread.component';

@NgModule({
  declarations: [CommentThreadComponent],
  exports: [CommentThreadComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    CommentReplyModule,
    UserMenuButtonModule,
  ],
})
export class CommentThreadModule {}
