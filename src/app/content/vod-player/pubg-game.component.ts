import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PubgGame } from 'src/app/model/pubg-game';
import { VodContainerComponent } from 'src/app/element/vod-container.component';
import { VodPlayerComponent } from 'src/app/element/vod/player.component';

@Component({
  templateUrl: './pubg-game.component.html',
  styleUrls: ['./pubg-game.component.scss']
})
export class PubgGameVodPlayerComponent {

  public game      : PubgGame;
  public gameInfo  : any;
  @ViewChild(VodContainerComponent, {static: false})
  public vodContainer: VodContainerComponent;
  @ViewChild(VodPlayerComponent, {static: false})
  public vodPlayer : VodPlayerComponent;

  public constructor(route: ActivatedRoute) {

    this.game = route.snapshot.data.game;
    this.gameInfo = route.snapshot.data.gameInfo;
  }

  public getElapsedTimeBySec(sec: number) {

    return parseInt(String(sec/60)) + ':' + parseInt(String(sec%60));
  }

  public seek(second: number) {

    this.vodPlayer.seek(second);
  }
}
