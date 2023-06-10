import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentReply } from 'src/app/model/comment-reply';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'comment-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class CommentReplyComponent {
  public authService: typeof AuthService;
  public isEditing = false;
  public editReplyCtrl: FormControl = new FormControl('', Validators.required);
  @Input()
  public reply: CommentReply;

  public constructor() {
    this.authService = AuthService;
  }

  public removeReply() {
    HttpService.api()
      .delete('comment-replies/' + this.reply.getAttrs().id, {})
      .subscribe(() => {
        this.reply.isExist = false;
      });
  }

  public updateReply() {
    HttpService.api()
      .patch<CommentReply>('comment-replies/' + this.reply.getAttrs().id, {
        message: this.editReplyCtrl.value,
      })
      .subscribe((reply: CommentReply) => {
        this.isEditing = false;
        this.reply.setAttrs(reply.getAttrs());
      });
  }
}
