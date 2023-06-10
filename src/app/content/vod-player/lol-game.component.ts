import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VodContainerComponent } from 'src/app/element/vod-container.component';
import { VodPlayerComponent } from 'src/app/element/vod/player.component';
import { LolGame } from 'src/app/model/lol-game';
import { LolTimeline } from 'src/app/model/lol-timeline';

@Component({
  templateUrl: './lol-game.component.html',
  styleUrls: ['./lol-game.component.scss'],
})
export class LolGameVodPlayerComponent {
  public game: LolGame;
  public gameInfo: any;
  @ViewChild(VodContainerComponent)
  public vodContainer: VodContainerComponent;
  @ViewChild(VodPlayerComponent)
  public vodPlayer: VodPlayerComponent;

  public constructor(route: ActivatedRoute) {
    this.game = route.snapshot.data.game;
    this.gameInfo = route.snapshot.data.gameInfo;
  }

  public getTimelineSec(timeline: LolTimeline) {
    const mSec = String(timeline.getAttrs().elapsed_timestamp);

    return parseInt(mSec.substr(0, mSec.length - 3));
  }

  public getElapsedTimeBySec(sec: number) {
    return parseInt(String(sec / 60)) + ':' + parseInt(String(sec % 60));
  }

  public seek(second: number) {
    this.vodPlayer.seek(second);
  }
}
