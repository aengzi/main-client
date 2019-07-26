import * as _ from 'lodash';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { PubgGameVodPlayerComponent } from './pubg-game.component';
import { HttpService } from 'src/app/service/http.service';
import { PubgGame } from 'src/app/model/pubg-game';
import { VideojsVodPlayerModule } from 'src/app/element/vod-player/videojs.module';
import { VodPlayerGameInfoModule } from 'src/app/element/vod-player/game-info.module';

const routes: Routes = [{
  path: '',
  component: PubgGameVodPlayerComponent,
  resolve: {
    game: 'game$$',
    gameInfo: 'gameInfo$$'
  }
}];

@NgModule({
  declarations: [
    PubgGameVodPlayerComponent
  ],
  exports: [
    PubgGameVodPlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VideojsVodPlayerModule,
    VodPlayerGameInfoModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'game$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get('pubg-games/'+snapshot.params.id, {
        params: {
          expands: 'vod.like, vod.review.bj, timelines',
          fields: 'id, vod_id, summary'
        }
      });
    }
  }, {
    provide: 'gameInfo$$',
    deps: ['game$$'],
    useFactory: (game$$) => {

      return (snapshot: ActivatedRouteSnapshot) => {

        return game$$(snapshot).pipe(
          map((game: PubgGame) => {

            return JSON.parse(game.getAttrs().summary);
          })
        );
      };
    }
  }]
})
export class PubgGameVodPlayerModule { }
