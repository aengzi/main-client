import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataEditComponent } from 'src/app/element/user-data/edit.component';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordEditUserDataComponent extends UserDataEditComponent {
  public passwordCtrl: FormControl;

  public constructor() {
    super();
    this.passwordCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ],
    });
  }

  public ngAfterViewInit() {
    this.form.addControl('password', this.passwordCtrl);
  }

  public submit$(): Observable<any> {
    return HttpService.api()
      .patch<User>('auth-user/', {
        password: this.passwordCtrl.value,
      })
      .pipe(
        map(() => {
          StorageService.get('snack-bar').open(
            '비밀번호가 변경되었습니다.',
            'close',
            {
              duration: 5000,
              verticalPosition: 'bottom',
            }
          );
        })
      );
  }

  public next$() {
    return of({});
  }
}
