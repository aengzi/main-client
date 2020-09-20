import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { EmailEditUserDataComponent } from './email.component';
import { EmailVerifierModule } from 'src/app/element/email-verifier.module';

const routes: Routes = [{
  path: '',
  component: EmailEditUserDataComponent
}];

@NgModule({
  declarations: [
    EmailEditUserDataComponent
  ],
  exports: [
    EmailEditUserDataComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    EmailVerifierModule,
    RouterModule.forChild(routes)
  ]
})
export class EmailEditUserDataModule { }
