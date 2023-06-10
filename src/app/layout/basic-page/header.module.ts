import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SignInDialogModule } from 'src/app/element/dialog/sign-in.module';
import { MaterialModule } from 'src/app/material.module';
import { BasicPageHeaderComponent } from './header.component';

@NgModule({
  declarations: [BasicPageHeaderComponent],
  exports: [BasicPageHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    SignInDialogModule,
  ],
})
export class BasicPageHeaderModule {}
