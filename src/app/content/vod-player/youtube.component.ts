import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { YtbVideo } from 'src/app/model/ytb-video';

@Component({
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeVodPlayerComponent {
  public url;
  public video: YtbVideo;

  public constructor(route: ActivatedRoute, sanitizer: DomSanitizer) {
    this.video = route.snapshot.data.video;
    this.url = sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' +
        this.video.getAttrs().ytb_id +
        '?autoplay=1&rel=0&enablejsapi=1'
    );
  }
}
