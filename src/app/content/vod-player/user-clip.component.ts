import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VodContainerComponent } from 'src/app/element/vod-container.component';
import { VodPlayerComponent } from 'src/app/element/vod/player.component';

@Component({
  templateUrl: './user-clip.component.html',
  styleUrls: ['./user-clip.component.scss']
})
export class UserClipVodPlayerComponent {

  public clip;
  @ViewChild(VodContainerComponent)
  public vodContainer: VodContainerComponent;
  @ViewChild(VodPlayerComponent)
  public vodPlayer   : VodPlayerComponent;

  public constructor(route: ActivatedRoute) {

    this.clip = route.snapshot.data.clip;
  }

  public getElapsedTimeBySec(sec: number) {

    return parseInt(String(sec/60)) + ':' + parseInt(String(sec%60));
  }

  public seek(second: number) {

    this.vodPlayer.seek(second);
  }
}
