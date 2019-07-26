import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PubgGame } from 'src/app/model/pubg-game';
import { VideojsVodPlayerComponent } from 'src/app/element/vod-player/videojs.component';

@Component({
  templateUrl: './pubg-game.component.html',
  styleUrls: ['./pubg-game.component.scss']
})
export class PubgGameVodPlayerComponent implements AfterViewInit {

  public game : PubgGame;
  public gameInfo : any;
  @ViewChild(VideojsVodPlayerComponent, {static: false})
  public videojsVodPlayer: VideojsVodPlayerComponent

  public constructor(route: ActivatedRoute) {

    this.game = route.snapshot.data.game;
    this.gameInfo = route.snapshot.data.gameInfo;
  }

  public ngAfterViewInit()
  {
    this.videojsVodPlayer.init(this.game);
  }

}
