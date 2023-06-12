import { AfterViewInit, Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class PostCreateComponent implements AfterViewInit {
  public contentCtrl: FormControl;
  public form: FormGroup;
  public titleCtrl: FormControl;
  public typeCtrl: FormControl;
  public router: Router;
  public viewRef: ViewContainerRef;

  constructor(
    route: ActivatedRoute,
    router: Router,
    viewRef: ViewContainerRef
  ) {
    this.router = router;
    this.viewRef = viewRef;
    this.contentCtrl = new FormControl('', {
      validators: [Validators.required],
    });
    this.titleCtrl = new FormControl('', {
      validators: [Validators.required],
    });
    this.typeCtrl = new FormControl(route.snapshot.queryParams.type, {
      validators: [
        Validators.required,
        (control) => {
          return ['free'].indexOf(control.value) == -1
            ? { pattern: true }
            : null;
        },
      ],
    });
    this.form = new FormGroup({
      type: this.typeCtrl,
      title: this.titleCtrl,
      content: this.contentCtrl,
    });
  }

  public ngAfterViewInit() {
    StorageService.get('classic-editor')
      .create(this.viewRef.element.nativeElement.querySelector('#editor'))
      .then((editor: any) => {
        this.viewRef.element.nativeElement
          .querySelector('.ck-editor')
          .classList.add('w-100');
        editor.model.document.on('change:data', () => {
          this.contentCtrl.setValue(editor.getData());
        });
      });
  }

  public confirm() {
    HttpService.api()
      .post<Post>('posts', {
        type: this.typeCtrl.value,
        title: this.titleCtrl.value,
        content: this.contentCtrl.value,
      })
      .subscribe(() => {
        this.router.navigate(['/' + this.typeCtrl.value + '-posts']);
      });
  }
}
