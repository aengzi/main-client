import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Observable, of } from 'rxjs';

export abstract class UserDataEditComponent {

  public form: FormGroup;
  @ViewChild('stepper')
  public stepper: MatHorizontalStepper;
  public isViewInit: boolean = false;
  abstract submit$() : Observable<any>;

  public constructor() {
    this.form = new FormGroup({});
    const intervalFunc = setInterval(() => {
      if ( this.hasOwnProperty('stepper') == true ) {
        this.isViewInit = true;
        clearInterval(intervalFunc);
      }
    })
  }


}
