import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignInDialogComponent } from 'src/app/element/dialog/sign-in.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [SignInDialogComponent],
  exports: [SignInDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SignInDialogModule {}
