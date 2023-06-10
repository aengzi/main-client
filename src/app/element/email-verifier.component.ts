import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'email-verifier',
  templateUrl: './email-verifier.component.html',
  styleUrls: ['./email-verifier.component.scss'],
})
export class EmailVerifierComponent {
  public codeCtrl: FormControl;
  public isSubmitting = false;
  @Input()
  public token: string = '';
  @Output()
  public success: EventEmitter<string> = new EventEmitter<string>();
  public verifiedToken: string = '';

  public constructor() {
    this.codeCtrl = new FormControl('', {
      validators: [
        Validators.required,
        (control) => {
          if (control.value.length != 6) {
            return { length: true };
          }
          return null;
        },
      ],
      asyncValidators: [
        (control) => {
          if (control.errors) {
            return of({});
          }

          return HttpService.api()
            .patch<string>('email-tokens', {
              token: this.token,
              code: control.value,
            })
            .pipe(
              map((token: string) => {
                if (token) {
                  this.verifiedToken = token;
                  this.success.emit(token);
                  if (this.success.observers.length > 0) {
                    this.isSubmitting = true;
                  }
                  return null;
                } else {
                  return { invalid: true };
                }
              })
            );
        },
      ],
    });
  }
}
