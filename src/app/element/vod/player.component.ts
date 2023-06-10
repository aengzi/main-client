import { Component, ElementRef, Input } from '@angular/core';
import Hls from 'hls.js';
import { Vod } from 'src/app/model/vod';

@Component({
  selector: 'vod-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class VodPlayerComponent {
  @Input()
  public vod: Vod;
  @Input()
  public config: any = {};
  public elRef: ElementRef;
  public videoEl: HTMLVideoElement;

  public constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  public ngAfterViewInit() {
    this.playAt(0);
  }

  public playAt(offset: number) {
    if ($(this.elRef.nativeElement).find('video').length > 0) {
      $(this.elRef.nativeElement).find('video').data('hls').destroy();
      $(this.elRef.nativeElement).empty();
    }

    const videoEl = this.elRef.nativeElement.appendChild(
      $('<video class="w-100" controls="true"></video>')[0]
    );

    $(videoEl).data(
      'hls',
      new Hls({
        debug: true,
        startPosition: offset,
      })
    );
    $(videoEl).data('hls').loadSource(this.vod.getAttrs().m3u8_url);
    $(videoEl).data('hls').attachMedia(videoEl);
    $(videoEl)
      .data('hls')
      .on(Hls.Events.MEDIA_ATTACHED, () => {
        videoEl.play();
      });
    $(videoEl)
      .data('hls')
      .on(Hls.Events.ERROR, (event: any, data: any) => {
        if (
          data.type == Hls.ErrorTypes.MEDIA_ERROR &&
          data.details == 'bufferSeekOverHole'
        ) {
          const currentTime = data.reason.match(/seeking from (\d+)/)[1];
          this.playAt(parseInt(currentTime) + 1);
        }
      });
    $(videoEl).on('seeking', () => {
      if (offset != parseInt(videoEl.currentTime)) {
        this.playAt(parseInt(videoEl.currentTime));
      }
    });
  }

  public seek(offset: number) {
    this.playAt(offset);
  }
}
