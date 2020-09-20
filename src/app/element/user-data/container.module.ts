import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { UserDataContainerComponent } from 'src/app/element/user-data/container.component';
import { EditUserDataDialogComponent } from 'src/app/element/dialog/edit-user-data.component';
import { EditUserDataDialogModule } from 'src/app/element/dialog/edit-user-data.module';
import { RouterModule } from '@angular/router';

@NgModule({
  entryComponents: [
    EditUserDataDialogComponent
  ],
  declarations: [
    UserDataContainerComponent
  ],
  exports: [
    UserDataContainerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    EditUserDataDialogModule
  ]
})
export class UserDataContainerModule { }
