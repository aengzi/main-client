import { Component } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './password-find.component.html',
  styleUrls: ['./password-find.component.scss']
})
export class UserPasswordFindComponent {

  public email: FormControl;
  public isSubmit: boolean = false;

  public constructor() {

    this.email = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    });
  }

  public submit() {

    return HttpService.api().post('pwd-resets', {
      email: this.email.value
    }).subscribe();
  }
}
