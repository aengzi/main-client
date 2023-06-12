import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VodContainerModule } from 'src/app/element/vod-container.module';
import { VodGameInfoModule } from 'src/app/element/vod/game-info.module';
import { VodPlayerModule } from 'src/app/element/vod/player.module';
import { MaterialModule } from 'src/app/material.module';
import { PubgGame } from 'src/app/model/pubg-game';
import { PubgTimeline } from 'src/app/model/pubg-timeline';
import { HttpService } from 'src/app/service/http.service';
import { PubgGameVodPlayerComponent } from './pubg-game.component';

const routes: Routes = [
  {
    path: '',
    component: PubgGameVodPlayerComponent,
    resolve: {
      game: 'game$$',
      gameInfo: 'gameInfo$$',
    },
  },
];

@NgModule({
  declarations: [PubgGameVodPlayerComponent],
  exports: [PubgGameVodPlayerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    VodContainerModule,
    VodGameInfoModule,
    VodPlayerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'game$$',
      useValue: (snapshot: ActivatedRouteSnapshot) => {
        return HttpService.api()
          .get<PubgGame>('pubg-games/' + snapshot.params.id, {
            params: {
              expands: 'vod.like, vod.bcast.bj, timelines',
              fields: 'id, summary',
            },
          })
          .pipe(
            map(({ result: game }) => game),
            map((game: PubgGame) => {
              const timelines = _.chain(game.getRelations().timelines)
                .orderBy(
                  [(timeline: PubgTimeline) => timeline.getAttrs().elapsed_sec],
                  ['asc']
                )
                .value();

              game.setRelation('timelines', timelines);

              return game;
            })
          );
      },
    },
    {
      provide: 'gameInfo$$',
      deps: ['game$$'],
      useFactory: (
        game$$: (snap: ActivatedRouteSnapshot) => Observable<PubgGame>
      ) => {
        return (snapshot: ActivatedRouteSnapshot) => {
          return game$$(snapshot).pipe(
            map((game: PubgGame) => {
              return JSON.parse(game.getAttrs().summary);
            })
          );
        };
      },
    },
  ],
})
export class PubgGameVodPlayerModule {}
