import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageListComponent } from 'src/app/element/page-list.component';
import { Model } from 'src/app/model';
import { CommentThread } from 'src/app/model/comment-thread';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'comment-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.scss'],
})
export class CommentThreadContainerComponent {
  public authService: typeof AuthService;
  public newThreads: CommentThread[] = [];
  @ViewChild('threadList')
  public threadList: PageListComponent;
  @Input()
  public related: Model<any, any>;
  public isAdding = false;
  public newThreadCtrl: FormControl = new FormControl('', Validators.required);

  public constructor() {
    this.authService = AuthService;
  }

  public hideNewThreadCtrl() {
    this.isAdding = false;
    this.newThreadCtrl.setValue('');
    this.newThreadCtrl.markAsUntouched();
  }

  public addThread() {
    HttpService.api()
      .post<CommentThread>('comment-threads', {
        message: this.newThreadCtrl.value,
        related_id: this.related.getAttrs().id,
        related_type: this.related.getModelType(),
      })
      .subscribe(({ result: commentThread }) => {
        this.newThreads.unshift(commentThread);
        this.isAdding = false;
        this.newThreadCtrl.setValue('');
        this.newThreadCtrl.markAsUntouched();
      });
  }
}
