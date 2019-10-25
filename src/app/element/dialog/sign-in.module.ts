import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SignInDialogComponent } from 'src/app/element/dialog/sign-in.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignInDialogComponent
  ],
  exports: [
    SignInDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SignInDialogModule { }
