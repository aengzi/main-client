import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VodPlayerGameInfoComponent } from 'src/app/element/vod-player/game-info.component';

@NgModule({
  declarations: [
    VodPlayerGameInfoComponent
  ],
  exports: [
    VodPlayerGameInfoComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class VodPlayerGameInfoModule { }
