import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(router: Router, bar: MatSnackBar) {
    StorageService.set('snack-bar', bar);
    StorageService.set('classic-editor', require('src/assets/ckeditor.min'));
    StorageService.set('router', router);
    // router.events.subscribe(event => {
    //   console.log(event);
    // });
  }
}
