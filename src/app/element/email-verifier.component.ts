import { Component, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'email-verifier',
  templateUrl: './email-verifier.component.html',
  styleUrls: ['./email-verifier.component.scss']
})
export class EmailVerifierComponent {

  public codeCtrl : FormControl;
  public isSubmitting: boolean = false;
  @Input('token')
  public token : string;
  @Output('success')
  public success: EventEmitter<string> = new EventEmitter<string>();
  public verifiedToken: string;

  public constructor() {
    this.codeCtrl = new FormControl('', {
      validators: [
        Validators.required,
        (control: FormControl) => {
          if ( control.value.length != 6 ) {
            return {length: true};
          }
        }
      ],
      asyncValidators: [
        (control: FormControl) => {
          if ( control.errors ) {
            return of({});
          }

          return HttpService.api().patch('email-tokens', {
            token: this.token,
            code: control.value
          }).pipe(
            map((token: string) => {
              if ( token ) {
                this.verifiedToken = token;
                this.success.emit(token);
                if ( this.success.observers.length > 0 ) {
                  this.isSubmitting = true;
                }
                return {};
              } else {
                return {invalid: true};
              }
            })
          );
        }
      ]
    });
  }

}
