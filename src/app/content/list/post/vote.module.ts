import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { VotePostListComponent } from './vote.component';

const routes: Routes = [{
  path: '',
  component: VotePostListComponent
}];

@NgModule({
  declarations: [
    VotePostListComponent
  ],
  exports: [
    VotePostListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class VotePostListModule { }
