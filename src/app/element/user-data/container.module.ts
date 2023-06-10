import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { EditUserDataDialogModule } from 'src/app/element/dialog/edit-user-data.module';
import { UserDataContainerComponent } from 'src/app/element/user-data/container.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [UserDataContainerComponent],
  exports: [UserDataContainerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    EditUserDataDialogModule,
  ],
})
export class UserDataContainerModule {}
