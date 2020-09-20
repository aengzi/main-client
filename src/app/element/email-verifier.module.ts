import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { EmailVerifierComponent } from './email-verifier.component';

@NgModule({
  declarations: [
    EmailVerifierComponent
  ],
  exports: [
    EmailVerifierComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class EmailVerifierModule { }
