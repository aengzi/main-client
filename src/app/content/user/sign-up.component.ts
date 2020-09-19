import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class UserSignUpComponent {

  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public nick: FormControl;
  @ViewChild('stepper')
  public stepper: MatHorizontalStepper;

  public constructor(route: ActivatedRoute) {

    this.email = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
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
    this.password = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]
    });
    this.nick = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
        (control: FormControl) => {
          return control.value.indexOf(' ') !== -1 ? {nospace: true} : null;
        },
      ],
      asyncValidators: [
        (control: FormControl) => {
          return HttpService.api().get('users', {
            params: {
              nick: control.value
            }
          }).pipe(
            map((users: User[]) => {
              return users.length != 0 ? {exist: true} : null;
            })
          );
        }
      ]
    });
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
      nick: this.nick
    });
  }

  public signUp(): void {

    this.stepper.next();
    HttpService.api().post('email/sign-up', {
      email: this.email.value,
      password: this.password.value,
      nick: this.nick.value
    }).subscribe();
  }
}
