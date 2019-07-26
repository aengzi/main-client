import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/service/storage.service';
import ClassicEditor from 'src/assets/ckeditor.min';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(router: Router, bar: MatSnackBar) {

    StorageService.set('snack-bar', bar);
    StorageService.set('classic-editor', ClassicEditor);
    // router.events.subscribe(event => {
    //   console.log(event);
    // });
  }
}
