import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { RoutePageListModule } from 'src/app/element/route-page-list.module';
import { MaterialModule } from 'src/app/material.module';
import { PubgGameSectionVodListComponent } from './pubg-game.component';

const routes: Routes = [
  {
    path: '',
    component: PubgGameSectionVodListComponent,
  },
];

@NgModule({
  declarations: [PubgGameSectionVodListComponent],
  exports: [PubgGameSectionVodListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RoutePageListModule,
    RouterModule.forChild(routes),
  ],
})
export class PubgGameSectionVodListModule {}
