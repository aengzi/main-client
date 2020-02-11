import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VodGameInfoComponent } from 'src/app/element/vod/game-info.component';

@NgModule({
  declarations: [
    VodGameInfoComponent
  ],
  exports: [
    VodGameInfoComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class VodGameInfoModule { }
