import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';

@Component({
  template: '',
})
export abstract class UserDataEditComponent {
  public form: FormGroup;
  @ViewChild('stepper')
  public stepper: MatStepper;
  public isViewInit = false;
  abstract submit$(): Observable<any>;
  abstract next$(): Observable<any>;

  public constructor() {
    this.form = new FormGroup({});
    const intervalFunc = setInterval(() => {
      if (this.hasOwnProperty('stepper') == true) {
        this.isViewInit = true;
        clearInterval(intervalFunc);
      }
    });
  }
}
