import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { EditUserDataDialogComponent } from 'src/app/element/dialog/edit-user-data.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditUserDataDialogComponent
  ],
  exports: [
    EditUserDataDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ]
})
export class EditUserDataDialogModule { }
