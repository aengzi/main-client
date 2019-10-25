import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { filter } from 'rxjs/operators';
import { Model } from 'src/app/model';
import { User } from 'src/app/model/user';
import { CommentThread } from 'src/app/model/comment-thread';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { PageListComponent } from 'src/app/element/page-list.component';

@Component({
  selector: 'comment-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.scss']
})
export class CommentThreadContainerComponent {

  public authService   : AuthService;
  public newThreads    : CommentThread[] = [];
  @ViewChild('threadList', {static: false})
  public threadList    : PageListComponent;
  @Input('related')
  public related       : Model<any, any>;
  public isAdding      : boolean = false;
  public newThreadCtrl : FormControl = new FormControl('', Validators.required);

  public constructor(authService: AuthService) {

    this.authService = authService;
  }

  public addThread() {

    HttpService.api().post<CommentThread>('comment-threads', {
      message: this.newThreadCtrl.value,
      related_id: this.related.getAttrs().id,
      related_type: this.related.getModelType()
    }).subscribe((commentThread: CommentThread) => {
      this.newThreads.unshift(commentThread);
      this.isAdding = false;
      this.newThreadCtrl.setValue('');
      this.newThreadCtrl.markAsUntouched();
    });
  }
}
