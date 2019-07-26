import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserSignUpCompleteComponent } from './sign-up-complete.component';

const routes: Routes = [{
  path: '',
  component: UserSignUpCompleteComponent
}];

@NgModule({
  declarations: [
    UserSignUpCompleteComponent
  ],
  exports: [
    UserSignUpCompleteComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserSignUpCompleteModule { }
