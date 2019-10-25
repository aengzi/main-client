import { Component, AfterViewInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
import { Post } from 'src/app/model/post';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class PostEditComponent implements AfterViewInit {

  public contentCtrl : FormControl;
  public titleCtrl : FormControl;
  public typeCtrl    : FormControl;
  public form        : FormGroup;
  public location    : Location;
  public post        : Post;
  public viewRef     : ViewContainerRef;

  constructor(location: Location, route: ActivatedRoute, viewRef: ViewContainerRef) {

    const post       = route.snapshot.data.post;

    this.post        = post;
    this.location    = location;
    this.viewRef     = viewRef;
    this.contentCtrl = new FormControl(post.getAttrs().content, {
      validators: [
        Validators.required
      ]
    });
    this.titleCtrl = new FormControl(post.getAttrs().title, {
      validators: [
        Validators.required
      ]
    });
    this.typeCtrl    = new FormControl(post.getAttrs().type, {
      validators: [
        Validators.required,
        (control: FormControl) => {
          return ['free'].indexOf(control.value) == -1 ? {pattern: true} : null;
        }
      ]
    });
    this.form = new FormGroup({
      type: this.typeCtrl,
      title: this.titleCtrl,
      content: this.contentCtrl
    });
  }

  public ngAfterViewInit () {

    StorageService.get('classic-editor').create(this.viewRef.element.nativeElement.querySelector('#editor')).then((editor) => {
      this.viewRef.element.nativeElement.querySelector('.ck-editor').classList.add('w-100');
      editor.setData(this.post.getAttrs().content);
      editor.model.document.on('change:data', (...args) => {
        this.contentCtrl.setValue(editor.getData());
      });
    });
  }

  public confirm() {

    HttpService.api().patch<Post>('posts/'+this.post.getAttrs().id, {
      type: this.typeCtrl.value,
      title: this.titleCtrl.value,
      content: this.contentCtrl.value
    }).subscribe((post: Post) => {
      this.location.back();
    });
  }
}
