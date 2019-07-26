import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserEmailChangeCompleteComponent } from './email-change-complete.component';

const routes: Routes = [{
  path: '',
  component: UserEmailChangeCompleteComponent
}];

@NgModule({
  declarations: [
    UserEmailChangeCompleteComponent
  ],
  exports: [
    UserEmailChangeCompleteComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UserEmailChangeCompleteModule { }
