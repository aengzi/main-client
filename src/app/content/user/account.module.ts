import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserDataContainerModule } from 'src/app/element/user-data/container.module';
import { MaterialModule } from 'src/app/material.module';
import { UserAccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
  },
];

@NgModule({
  declarations: [UserAccountComponent],
  exports: [UserAccountComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    UserDataContainerModule,
    RouterModule.forChild(routes),
  ],
})
export class UserAccountModule {}
