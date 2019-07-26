import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideojsVodPlayerComponent } from 'src/app/element/vod-player/videojs.component';

@Component({
  templateUrl: './user-clip.component.html',
  styleUrls: ['./user-clip.component.scss']
})
export class UserClipVodPlayerComponent implements AfterViewInit {

  @ViewChild(VideojsVodPlayerComponent, {static: false})
  public videojsVodPlayer: VideojsVodPlayerComponent
  public clip;

  public constructor(route: ActivatedRoute) {

    this.clip = route.snapshot.data.clip;
  }

  public ngAfterViewInit()
  {
    this.videojsVodPlayer.init(this.clip);
  }

}
