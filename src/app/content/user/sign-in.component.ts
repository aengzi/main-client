import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class UserSignInComponent {

  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public router: Router;
  public route: ActivatedRoute;

  public constructor (route: ActivatedRoute, router: Router) {

    this.route  = route;
    this.router = router;
    this.email  = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    });
    this.password = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]
    });
    this.form = new FormGroup({
      email: this.email,
      password: this.password
    });

    if ( AuthService.getUser() ) {
      this.goPreviousPage();
    }
  }

  public signIn() {

    return HttpService.api().post<string>('sign-in', {
      email: this.email.value,
      password: this.password.value

    }).pipe(switchMap((token: string) => {

      localStorage.setItem('aengzi-auth-token', token);
      return HttpService.api().get<User>('auth/user');

    })).subscribe((user: User) => {

      AuthService.setUser(user);
      this.goPreviousPage();
    });
  }

  public goPreviousPage() {

    const params   = {};
    const referrer = this.route.snapshot.queryParams.referrer ? this.route.snapshot.queryParams.referrer : '/';
    const path     = referrer.match('.*(?=(\\?))') ? referrer.match('.*(?=(\\?))')[0] : referrer;

    (referrer.match('(?<=(\\?)).*') ? referrer.match('(?<=(\\?)).*')[0].split('&') : []).forEach((str) => {
        params[str.split('=')[0]] = str.split('=')[1];
    });

    this.router.navigate([path], {
      queryParams: params
    });
  }
}
