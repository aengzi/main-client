import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class UserSignInComponent {
  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public router: Router;
  public route: ActivatedRoute;

  public constructor(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.router = router;
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

    if (AuthService.getUser()) {
      this.goPreviousPage();
    }
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
        this.goPreviousPage();
      });
  }

  public goPreviousPage() {
    const params: Params = {};
    const referrer = this.route.snapshot.queryParams.referrer
      ? this.route.snapshot.queryParams.referrer
      : '/';
    const path = referrer.match('.*(?=(\\?))')
      ? referrer.match('.*(?=(\\?))')[0]
      : referrer;

    (referrer.match('(?<=(\\?)).*')
      ? referrer.match('(?<=(\\?)).*')[0].split('&')
      : []
    ).forEach((str: string) => {
      params[str.split('=')[0]] = str.split('=')[1];
    });

    this.router.navigate([path], {
      queryParams: params,
    });
  }
}
