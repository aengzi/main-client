import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailVerifierComponent } from 'src/app/element/email-verifier.component';
import { UserDataEditComponent } from 'src/app/element/user-data/edit.component';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailEditUserDataComponent extends UserDataEditComponent {
  public emailCtrl: FormControl;
  public hasNext: boolean;
  @ViewChild('emailVerifier')
  public emailVerifier: EmailVerifierComponent;

  public constructor() {
    super();
    this.hasNext = true;
    this.emailCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        (control) => {
          return control.value == AuthService.getUser().getAttrs().email
            ? { same: true }
            : null;
        },
      ],
      asyncValidators: [
        (control) => {
          return HttpService.api()
            .get<User[]>('users', {
              params: {
                email: control.value,
              },
            })
            .pipe(
              map((users: User[]) => {
                return users.length != 0 ? { exist: true } : null;
              })
            );
        },
      ],
    });
  }

  public ngAfterViewInit() {
    this.form.addControl('code', this.emailVerifier.codeCtrl);
  }

  public next$() {
    if (this.hasNext) {
      HttpService.api()
        .post<string>('auth-user/emails', {
          email: this.emailCtrl.value,
        })
        .pipe(
          map((token: string) => {
            this.hasNext = false;
            this.stepper.next();
            this.emailVerifier.token = token;
            StorageService.get('snack-bar').open(
              '변경할 이메일로 메일을 보냈습니다. 확인하여 변경을 완료해주세요.',
              'close',
              {
                duration: 5000,
                verticalPosition: 'bottom',
              }
            );
          })
        );
    }
    return of({});
  }

  public submit$() {
    return HttpService.api()
      .patch<User>('auth-user', {
        token: this.emailVerifier.verifiedToken,
      })
      .pipe(
        map((user: User) => {
          AuthService.setUser(user);
        })
      );
  }
}
