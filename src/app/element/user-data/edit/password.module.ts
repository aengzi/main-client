import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PasswordEditUserDataComponent } from './password.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordEditUserDataComponent,
  },
];

@NgModule({
  declarations: [PasswordEditUserDataComponent],
  exports: [PasswordEditUserDataComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PasswordEditUserDataModule {}
