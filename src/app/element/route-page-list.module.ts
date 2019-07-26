import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RoutePageListComponent } from './route-page-list.component';

@NgModule({
  declarations: [
    RoutePageListComponent
  ],
  exports: [
    RoutePageListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
  ]
})
export class RoutePageListModule { }
