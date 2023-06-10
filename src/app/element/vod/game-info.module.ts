import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VodGameInfoComponent } from 'src/app/element/vod/game-info.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [VodGameInfoComponent],
  exports: [VodGameInfoComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
})
export class VodGameInfoModule {}
