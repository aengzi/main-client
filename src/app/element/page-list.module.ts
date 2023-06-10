import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PageListComponent } from './page-list.component';

@NgModule({
  declarations: [PageListComponent],
  exports: [PageListComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
})
export class PageListModule {}
