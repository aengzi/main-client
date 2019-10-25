import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class UserPasswordResetComponent {

  public id: string;
  public token: string;
  public password: FormControl;
  public isSubmit: boolean = false;
  public router: Router;

  public constructor(route: ActivatedRoute, router: Router) {

    this.id       = route.snapshot.queryParams.id;
    this.token    = route.snapshot.queryParams.token;
    this.password = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]
    });
    this.router   = router;
  }

  public submit() {

    HttpService.api().patch('pwd-resets/'+this.id, {
      token: this.token,
      password: this.password.value
    }).subscribe(() => {

      StorageService.get('snack-bar').open(
        '비밀번호가 재설정 되었습니다. 로그인해주세요.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
      this.isSubmit = true;
      this.router.navigate(['/sign-in']);
    });
  }
}
