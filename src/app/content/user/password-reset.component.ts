import { Component } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class UserPasswordResetComponent {

  public id: string;
  public token: string;
  public password: FormControl;
  public isSubmit: boolean = false;

  public constructor(route: ActivatedRoute) {

    this.id       = route.snapshot.queryParams.id;
    this.token    = route.snapshot.queryParams.token;
    this.password = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]
    });
  }

  public submit() {

    HttpService.api().patch('pwd-resets/'+this.id, {
      token: this.token,
      password: this.password.value
    }).subscribe(() => {
      this.isSubmit = true;
    });
  }
}
