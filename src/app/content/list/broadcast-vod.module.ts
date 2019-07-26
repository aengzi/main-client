import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RoutePageListModule } from 'src/app/element/route-page-list.module';
import { BroadcastVodListComponent } from './broadcast-vod.component';

const routes: Routes = [{
  path: '',
  component: BroadcastVodListComponent
}]

@NgModule({
  declarations: [
    BroadcastVodListComponent
  ],
  exports: [
    BroadcastVodListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RoutePageListModule,
    RouterModule.forChild(routes)
  ]
})
export class BroadcastVodListModule { }
