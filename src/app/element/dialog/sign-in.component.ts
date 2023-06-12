import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'sign-in-dialog',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInDialogComponent {
  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public viewRef: MatDialogRef<SignInDialogComponent>;
  public router: Router;

  public constructor(
    router: Router,
    viewRef: MatDialogRef<SignInDialogComponent>
  ) {
    this.router = router;
    this.viewRef = viewRef;
    this.email = new FormControl('', {
      validators: [Validators.required, Validators.email],
    });
    this.password = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ],
    });
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  public signIn() {
    return HttpService.api()
      .post<string>('sign-in', {
        email: this.email.value,
        password: this.password.value,
      })
      .pipe(
        switchMap(({ result: token }) => {
          localStorage.setItem('aengzi-auth-token', token);
          return HttpService.api().get<User>('auth-user');
        })
      )
      .subscribe(({ result: user }) => {
        AuthService.setUser(user);
        // this.viewRef.close();
        window.location.reload();
      });
  }
}
