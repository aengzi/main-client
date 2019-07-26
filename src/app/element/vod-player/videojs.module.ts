import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VodPlayerModule } from 'src/app/element/vod-player.module';
import { VideojsVodPlayerComponent } from './videojs.component';

@NgModule({
  declarations: [
    VideojsVodPlayerComponent,
  ],
  exports: [
    VideojsVodPlayerComponent,
  ],
  imports: [
    CommonModule,
    VodPlayerModule
  ]
})
export class VideojsVodPlayerModule { }
