import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { YtbVideo } from 'src/app/model/ytb-video';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeVodPlayerComponent {

  public url;
  public video: YtbVideo;

  public constructor(route: ActivatedRoute, authService: AuthService, sanitizer: DomSanitizer) {

    this.video = route.snapshot.data.video;
    this.url = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.video.getAttrs().ytb_id+'?autoplay=1&rel=0&enablejsapi=1');
  }
}
