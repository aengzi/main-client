import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RoutePageListModule } from 'src/app/element/route-page-list.module';
import { FreePostListComponent } from './free.component';

const routes: Routes = [{
  path: '',
  component: FreePostListComponent
}];

@NgModule({
  declarations: [
    FreePostListComponent
  ],
  exports: [
    FreePostListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RoutePageListModule,
    RouterModule.forChild(routes)
  ]
})
export class FreePostListModule { }
