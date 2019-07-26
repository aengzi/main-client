import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class UserAccountComponent {

  public authService    : AuthService;
  public emailCtrl      : FormControl;
  public passwordCtrl   : FormControl;
  public isEditEmail    : boolean = false;
  public isEditPassword : boolean = false;

  public constructor(authService: AuthService) {
    this.authService = authService;
    this.emailCtrl = new FormControl(authService.getUser().getAttrs().email, {
      validators: [
        Validators.required,
        Validators.email,
        (control: FormControl) => {
          return control.value == authService.getUser().getAttrs().email ? {same: true} : null;
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
    this.passwordCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]
    });
  }

  public changeEmail() {

    HttpService.api().post('email/change-email', {
      email: this.emailCtrl.value
    }).subscribe(() => {

      StorageService.get('snack-bar').open(
        '변경할 이메일로 메일을 보냈습니다. 확인하여 변경을 완료해주세요.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
      this.isEditEmail = false;
    });
  }

  public changePassword() {

    HttpService.api().patch('users/'+AuthService.getUser().getAttrs().id, {
      password: this.passwordCtrl.value
    }).subscribe(() => {

      StorageService.get('snack-bar').open(
        '비밀번호가 변경되었습니다.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
      this.isEditPassword = false;
    });
  }
}
