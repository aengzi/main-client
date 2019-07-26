import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserAccountComponent } from './account.component';

const routes: Routes = [{
  path: '',
  component: UserAccountComponent
}];

@NgModule({
  declarations: [
    UserAccountComponent
  ],
  exports: [
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserAccountModule { }
