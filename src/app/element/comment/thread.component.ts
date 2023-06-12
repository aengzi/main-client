import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import * as _ from 'lodash';
import { CommentReply } from 'src/app/model/comment-reply';
import {
  CommentThread,
  CommentThreadRelations,
} from 'src/app/model/comment-thread';
import { Dislike } from 'src/app/model/dislike';
import { Like } from 'src/app/model/like';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'comment-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class CommentThreadComponent {
  public authService: typeof AuthService;
  @Input()
  public thread: CommentThread;
  public editThreadCtrl: FormControl = new FormControl('', Validators.required);
  public newReplyCtrl: FormControl = new FormControl('', Validators.required);
  public replyList: CommentReply[] = [];

  public isEditing = false;
  public isReplyAdding = false;
  public isReplyShown = false;
  public isReplyLoadAll = false;
  public isThumbBtnLock = false;

  public constructor() {
    this.authService = AuthService;
  }

  public addDislike() {
    this.isThumbBtnLock = true;
    this.thread.setRelation('dislike', new Dislike());
    HttpService.api()
      .post<Dislike>('dislikes', {
        related_id: this.thread.getAttrs().id,
        related_type: 'comment_thread',
      })
      .subscribe(({ result: dislike }) => {
        this.isThumbBtnLock = false;
        this.thread.setRelation('dislike', dislike);
        this.thread.getAttrs().dislike_count += 1;
      });
  }

  public addLike() {
    this.isThumbBtnLock = true;
    HttpService.api()
      .post<Like>('likes', {
        related_id: this.thread.getAttrs().id,
        related_type: 'comment_thread',
      })
      .subscribe(({ result: like }) => {
        this.isThumbBtnLock = false;
        this.thread.setRelation('like', like);
        this.thread.getAttrs().like_count += 1;
      });
  }

  public addReply() {
    HttpService.api()
      .post<CommentReply>('comment-replies', {
        message: this.newReplyCtrl.value,
        thread_id: this.thread.getAttrs().id,
      })
      .subscribe(({ result: commentReply }) => {
        commentReply.isNew = true;
        this.replyList.push(commentReply);
        this.thread.getAttrs().reply_count += 1;
        this.isReplyAdding = false;
        this.newReplyCtrl.setValue('');
        this.newReplyCtrl.markAsUntouched();
      });
  }

  public showEditThreadCtrl() {
    this.isEditing = true;
    this.editThreadCtrl.setValue(this.thread.getAttrs().message);
  }

  public showNewReplyCtrl() {
    this.isReplyAdding = true;
    this.newReplyCtrl.setValue('');
    this.newReplyCtrl.markAsUntouched();
  }

  public removeDislike() {
    this.isThumbBtnLock = true;
    HttpService.api()
      .delete(
        'dislikes/' + this.thread.getRelations().dislike.getAttrs().id,
        {}
      )
      .subscribe(() => {
        this.isThumbBtnLock = false;
        this.thread.getAttrs().dislike_count -= 1;
        const relations = this.thread.getRelations();
        delete (<Partial<CommentThreadRelations>>relations).dislike;
      });
  }

  public removeLike() {
    this.isThumbBtnLock = true;
    HttpService.api()
      .delete('likes/' + this.thread.getRelations().like.getAttrs().id, {})
      .subscribe(() => {
        this.isThumbBtnLock = false;
        this.thread.getAttrs().like_count -= 1;
        const relations = this.thread.getRelations();
        delete (<Partial<CommentThreadRelations>>relations).like;
      });
  }

  public removeThread() {
    HttpService.api()
      .delete('comment-threads/' + this.thread.getAttrs().id, {})
      .subscribe(() => {
        this.thread.isExist = false;
      });
  }

  public updateThread() {
    HttpService.api()
      .patch<CommentThread>('comment-threads/' + this.thread.getAttrs().id, {
        message: this.editThreadCtrl.value,
      })
      .subscribe(({ result: thread }) => {
        this.thread.setAttrs(thread.getAttrs());
        this.isEditing = false;
      });
  }

  public loadMoreReply() {
    const params: Params = {
      thread_id: this.thread.getAttrs().id,
      order_by: 'created_at asc',
      expands: 'user',
      limit: '10',
    };
    const cursor = _.findLast(this.replyList, (reply) => reply.isNew == false);

    if (cursor) {
      params['cursor_id'] = cursor.getAttrs().id;
    }

    HttpService.api()
      .get<CommentReply[]>('comment-replies/', {
        params: params,
      })
      .subscribe(({ result: loadList }) => {
        this.replyList = _.chain(this.replyList)
          .concat(loadList)
          .keyBy((reply) => reply.getAttrs().id)
          .values()
          .orderBy(
            [
              (reply) => reply.getAttrs().created_at,
              (reply) => reply.getAttrs().id,
            ],
            ['asc', 'asc']
          )
          .value();

        if (parseInt(params.limit) > loadList.length) {
          this.isReplyLoadAll = true;
        }
      });
  }
}
