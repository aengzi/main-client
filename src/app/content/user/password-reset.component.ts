import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { EmailVerifierComponent } from 'src/app/element/email-verifier.component';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class UserPasswordResetComponent {
  public id: string;
  public form: FormGroup;
  public emailCtrl: FormControl;
  public passwordCtrl: FormControl;
  @ViewChild('stepper')
  public stepper: MatStepper;
  @ViewChild('emailVerifier')
  public emailVerifier: EmailVerifierComponent;
  public token: string;

  public constructor(route: ActivatedRoute) {
    this.id = route.snapshot.queryParams.id;
    this.passwordCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ],
    });
    this.emailCtrl = new FormControl('', {
      validators: [Validators.required, Validators.email],
    });
    this.form = new FormGroup({
      password: this.passwordCtrl,
      email: this.emailCtrl,
    });
  }

  public resetPassword() {
    HttpService.api()
      .patch<User>('auth-user/', {
        token: this.emailVerifier.verifiedToken,
        password: this.passwordCtrl.value,
      })
      .subscribe(() => {
        StorageService.get('snack-bar').open(
          '비밀번호가 재설정 되었습니다. 로그인해주세요.',
          'close',
          {
            duration: 5000,
            verticalPosition: 'bottom',
          }
        );
        StorageService.get('router').navigate(['/sign-in']);
      });
  }

  public sendVerifyEmail() {
    HttpService.api()
      .post<string>('password-reset/emails', {
        email: this.emailCtrl.value,
      })
      .subscribe(({ result: token }) => {
        this.token = token;
        this.stepper.next();
      });
  }
}
