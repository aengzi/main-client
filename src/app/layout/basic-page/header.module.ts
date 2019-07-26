import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BasicPageHeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/material.module';
import { SignInDialogComponent } from 'src/app/element/dialog/sign-in.component';
import { SignInDialogModule } from 'src/app/element/dialog/sign-in.module';

@NgModule({
  entryComponents: [
    SignInDialogComponent
  ],
  declarations: [
    BasicPageHeaderComponent,
  ],
  exports: [
    BasicPageHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    SignInDialogModule
  ]
})
export class BasicPageHeaderModule { }
