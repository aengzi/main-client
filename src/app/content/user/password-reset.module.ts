import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerifierModule } from 'src/app/element/email-verifier.module';
import { MaterialModule } from 'src/app/material.module';
import { UserPasswordResetComponent } from './password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: UserPasswordResetComponent,
  },
];

@NgModule({
  declarations: [UserPasswordResetComponent],
  exports: [UserPasswordResetComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    EmailVerifierModule,
    RouterModule.forChild(routes),
  ],
})
export class UserPasswordResetModule {}
