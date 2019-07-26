import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserPasswordResetComponent } from './password-reset.component';

const routes: Routes = [{
  path: '',
  component: UserPasswordResetComponent
}];

@NgModule({
  declarations: [
    UserPasswordResetComponent
  ],
  exports: [
    UserPasswordResetComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserPasswordResetModule { }
