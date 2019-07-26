import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LolGame } from 'src/app/model/lol-game';
import { LolTimeline } from 'src/app/model/lol-timeline';
import { VideojsVodPlayerComponent } from 'src/app/element/vod-player/videojs.component';

@Component({
  templateUrl: './lol-game.component.html',
  styleUrls: ['./lol-game.component.scss']
})
export class LolGameVodPlayerComponent implements AfterViewInit {

  public game : LolGame;
  public gameInfo : any;
  @ViewChild(VideojsVodPlayerComponent, {static: false})
  public videojsVodPlayer: VideojsVodPlayerComponent

  public constructor(route: ActivatedRoute) {

    this.game = route.snapshot.data.game;
    this.gameInfo = route.snapshot.data.gameInfo;
  }

  public ngAfterViewInit() {

    this.videojsVodPlayer.init(this.game);
  }

  public getTimelineSec(timeline: LolTimeline) {

    const mSec = String(timeline.getAttrs().elapsed_timestamp);

    return parseInt(mSec.substr(0, mSec.length-3));
  }
}
