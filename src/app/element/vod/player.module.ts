import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VodPlayerComponent } from 'src/app/element/vod/player.component';

@NgModule({
  declarations: [
    VodPlayerComponent
  ],
  exports: [
    VodPlayerComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class VodPlayerModule { }
