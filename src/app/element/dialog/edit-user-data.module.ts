import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { EditUserDataDialogComponent } from 'src/app/element/dialog/edit-user-data.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [EditUserDataDialogComponent],
  exports: [EditUserDataDialogComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
})
export class EditUserDataDialogModule {}
