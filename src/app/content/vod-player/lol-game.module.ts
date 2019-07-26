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
import { VideojsVodPlayerModule } from 'src/app/element/vod-player/videojs.module';
import { VodPlayerGameInfoModule } from 'src/app/element/vod-player/game-info.module';

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
    VideojsVodPlayerModule,
    VodPlayerGameInfoModule,
    RouterModule.forChild(routes)
  ],
  providers: [{
    provide: 'game$$',
    useValue: (snapshot: ActivatedRouteSnapshot) => {

      return HttpService.api().get('lol-games/'+snapshot.params.id, {
        params: {
          expands: 'vod.like, vod.review.bj, timelines',
          fields: 'id, vod_id, participant_id, matches'
        }
      });
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
