import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class VodPlayerService {

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
    console.log('initTime', initTime);

    player.currentTime(initTime);
    player.on('seeking', (...args) => {
      const currentTime = player.currentTime();
      console.log('currentTime', currentTime);
      if ( initTime != currentTime ) {
        player.dispose();
        console.log(currentTime);
        this.init(id, {
          offset: currentTime
        });
      }
    });
  }

  public static get(id) {

    return window['videojs']($('#'+id)[0]);
  }
}
