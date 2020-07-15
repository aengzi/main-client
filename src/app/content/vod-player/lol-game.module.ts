import * as _ from 'lodash';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { LolGameVodPlayerComponent } from './lol-game.component';
import { HttpService } from 'src/app/service/http.service';
import { LolGame } from 'src/app/model/lol-game';
import { LolTimeline } from 'src/app/model/lol-timeline';
import { VodContainerModule } from 'src/app/element/vod-container.module';
import { VodGameInfoModule } from 'src/app/element/vod/game-info.module';
import { VodPlayerModule } from 'src/app/element/vod/player.module';

const routes: Routes = [{
  path: '',
  component: LolGameVodPlayerComponent,
  resolve: {
    game: 'game$$',
    gameInfo: 'gameInfo$$'
  }
}];

@NgModule({
  declarations: [
    LolGameVodPlayerComponent
  ],
  exports: [
    LolGameVodPlayerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VodContainerModule,
    VodGameInfoModule,
    VodPlayerModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'game$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get('lol-games/'+snapshot.params.id, {
        params: {
          expands: 'vod.like, vod.bcast.bj, timelines',
          fields: 'id, participant_id, matches'
        }
      }).pipe(
        map((game: LolGame) => {

          const timelines = _.chain(game.getRelations().timelines).orderBy([(timeline: LolTimeline) => timeline.getAttrs().elapsed_timestamp], ['asc']).value();

          game.setRelation('timelines', timelines);

          return game;
        })
      );
    }
  }, {
    provide: 'gameInfo$$',
    deps: ['game$$'],
    useFactory: (game$$) => {

      return (snapshot: ActivatedRouteSnapshot) => {

        return game$$(snapshot).pipe(
          map((game: LolGame) => {

            const matches = JSON.parse(game.getAttrs().matches);
            const player = _.chain(matches.participants).filter((participant) => {
              return participant.participantId == game.getAttrs().participant_id;
            }).first().value();
            const myTeam = _.chain(matches.teams).filter((team) => {
              return team.teamId == player.teamId;
            }).first().value();
            const otherTeam = _.chain(matches.teams).filter((team) => {
              return team.teamId == player.teamId;
            }).first().value();

            return {
              player: player,
              myTeam: myTeam,
              otherTeam: otherTeam
            };
          })
        );
      }
    }
  }]
})
export class LolGameVodPlayerModule { }
