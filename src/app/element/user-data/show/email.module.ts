import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { EmailShowUserDataComponent } from './email.component';

const routes: Routes = [{
  path: '',
  component: EmailShowUserDataComponent
}];

@NgModule({
  declarations: [
    EmailShowUserDataComponent
  ],
  exports: [
    EmailShowUserDataComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EmailShowUserDataModule { }
