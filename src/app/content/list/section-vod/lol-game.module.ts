import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RoutePageListModule } from 'src/app/element/route-page-list.module';
import { LolGameSectionVodListComponent } from './lol-game.component';

const routes: Routes = [{
  path: '',
  component: LolGameSectionVodListComponent
}];

@NgModule({
  declarations: [
    LolGameSectionVodListComponent
  ],
  exports: [
    LolGameSectionVodListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RoutePageListModule,
    RouterModule.forChild(routes)
  ]
})
export class LolGameSectionVodListModule { }
