import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserDataEditComponent } from 'src/app/element/user-data/edit.component';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
import { EmailVerifierComponent } from 'src/app/element/email-verifier.component';

@Component({
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
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
        (control: FormControl) => {
          return control.value == AuthService.getUser().getAttrs().email ? {same: true} : null;
        }
      ],
      asyncValidators: [
        (control: FormControl) => {
          return HttpService.api().get('users', {
            params: {
              email: control.value
            }
          }).pipe(
            map((users: User[]) => {
              return users.length != 0 ? {exist: true} : null;
            })
          );
        }
      ]
    });
  }

  public ngAfterViewInit() {
    this.form.addControl('code', this.emailVerifier.codeCtrl);
  }

  public next$() {
    if ( this.hasNext ) {
      return HttpService.api().post('auth-user/emails', {
        email: this.emailCtrl.value
      }).pipe(
        map((token: string) => {
          this.hasNext = false;
          this.stepper.next();
          this.emailVerifier.token = token;
          StorageService.get('snack-bar').open(
            '변경할 이메일로 메일을 보냈습니다. 확인하여 변경을 완료해주세요.',
            'close', {
            duration: 5000,
            verticalPosition: 'bottom'
          });
        })
      );
    }
  }

  public submit$() {
    return HttpService.api().patch('auth-user', {
      token: this.emailVerifier.verifiedToken
    }).pipe(
      map((user: User) => {
        AuthService.setUser(user);
      })
    );
  }

}
