import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vod } from 'src/app/model/vod';
import * as _ from 'lodash';

@Component({
  selector: 'vod-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class VodPlayerComponent {

  @ViewChild('player', {static: false})
  public player: ElementRef;
  @Input('vod')
  public vod: Vod;
  @Input('config')
  public config: any = {};

  public ngAfterViewInit() {

    videojs(this.player.nativeElement, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      sources: [{
        src: this.vod.getAttrs().m3u8_url,
        type: 'application/x-mpegURL'
      }]
    });
  }

  public seek(offset) {

    videojs(this.player.nativeElement).currentTime(offset);
  }
}
