import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class UserSignUpComponent {
  public form: FormGroup;
  public emailCtrl: FormControl;
  public passwordCtrl: FormControl;
  public nickCtrl: FormControl;
  @ViewChild('stepper')
  public stepper: MatStepper;
  public token: string;

  public constructor(route: ActivatedRoute) {
    this.emailCtrl = new FormControl('', {
      validators: [Validators.required, Validators.email],
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
    this.passwordCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ],
    });
    this.nickCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
        (control) => {
          return control.value.indexOf(' ') !== -1 ? { nospace: true } : null;
        },
      ],
      asyncValidators: [
        (control) => {
          return HttpService.api()
            .get<User[]>('users', {
              params: {
                nick: control.value,
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
    this.form = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
      nick: this.nickCtrl,
    });
  }

  public sendSignUpEmail() {
    HttpService.api()
      .post<string>('sign-up/emails', {
        email: this.emailCtrl.value,
        nick: this.nickCtrl.value,
        password: this.passwordCtrl.value,
      })
      .subscribe((token: string) => {
        this.token = token;
        this.stepper.next();
      });
  }

  public signUp(token: string) {
    HttpService.api()
      .post('sign-up', {
        token: token,
      })
      .subscribe(() => {
        StorageService.get('snack-bar').open(
          '회원가입을 환영합니다. 로그인해주세요.',
          'close',
          {
            duration: 5000,
            verticalPosition: 'bottom',
          }
        );
        StorageService.get('router').navigate(['sign-in']);
      });
  }
}
