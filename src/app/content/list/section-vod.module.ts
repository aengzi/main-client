import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SectionVodListComponent } from './section-vod.component';

const routes: Routes = [{
  path: '',
  component: SectionVodListComponent,
  children: [{
    path: 'lol-games',
    loadChildren: () => import('src/app/content/list/section-vod/lol-game.module').then(mod => mod.LolGameSectionVodListModule)
  }, {
    path: 'pubg-games',
    loadChildren: () => import('src/app/content/list/section-vod/pubg-game.module').then(mod => mod.PubgGameSectionVodListModule)
  }, {
    path: '',
    redirectTo: 'lol-games'
  }]
}]

@NgModule({
  declarations: [
    SectionVodListComponent
  ],
  exports: [
    SectionVodListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class SectionVodListModule { }
