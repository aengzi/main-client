import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class VodPlayerService {

  public static players = {};

  public static init(id, options) {

    window['videojs'].options.controls = true;
    window['videojs'].options.autoplay = true;
    window['videojs'].options.preload  = 'auto';

    const config = _.merge($('#'+id+'-outer').data(), options);

    $('#'+id).remove();
    $('#'+id+'-outer').data(config);
    $('#'+id+'-outer').append('<video id="'+id+'" class="video-js vjs-default-skin"></video>');

    const player   = window['videojs']($('#'+id)[0], config);
    const initTime = config.offset ? config.offset: 0;

    player.currentTime(initTime);
    player.on('seeking', (...args) => {

      const currentTime = player.currentTime();

      if ( initTime != currentTime ) {
        player.dispose();
        this.init(id, {
          offset: currentTime
        });
      }
    });

    this.players[id] = player;
  }

  public static get(id) {

    return this.players[id];
  }
}
