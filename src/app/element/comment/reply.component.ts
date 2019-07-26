import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { CommentReply } from 'src/app/model/comment-reply';

@Component({
  selector: 'comment-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class CommentReplyComponent {

  public authService   : AuthService;
  @Input('reply')
  public reply         : CommentReply;
  public editReplyCtrl : FormControl = new FormControl('', Validators.required);

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  public removeReply() {

    HttpService.api().delete('comment-replies/'+this.reply.getAttrs().id, {
    }).subscribe(() => {
      this.reply.isExist = false;
    });
  }

  public updateReply() {

    HttpService.api().patch('comment-replies/'+this.reply.getAttrs().id, {
      message: this.editReplyCtrl.value
    }).subscribe((reply: CommentReply) => {
      delete this.editReplyCtrl;
      this.reply.setAttrs(reply.getAttrs());
    });
  }

}
