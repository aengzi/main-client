import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserPasswordFindComponent } from './password-find.component';

const routes: Routes = [{
  path: '',
  component: UserPasswordFindComponent
}];

@NgModule({
  declarations: [
    UserPasswordFindComponent
  ],
  exports: [
    UserPasswordFindComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserPasswordFindModule { }
