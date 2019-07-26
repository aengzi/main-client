import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BoardComponent } from './board.component';

const routes: Routes = [{
  path: '',
  component: BoardComponent
}];

@NgModule({
  declarations: [
    BoardComponent
  ],
  exports: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardModule { }
