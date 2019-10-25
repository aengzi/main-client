import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserSignInComponent } from 'src/app/content/user/sign-in.component';

const routes: Routes = [{
  path: '',
  component: UserSignInComponent
}];

@NgModule({
  declarations: [
    UserSignInComponent
  ],
  exports: [
    UserSignInComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserSignInModule { }
