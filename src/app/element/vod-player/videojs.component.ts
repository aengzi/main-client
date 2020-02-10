import * as xmlJs from 'xml-js';
import * as _ from 'lodash';
import { Component, ContentChild, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { of, from } from 'rxjs';
import { map, switchMap, finalize } from 'rxjs/operators';
import { Model } from 'src/app/model';
import { Vod } from 'src/app/model/vod';
import { XhrService } from 'src/app/service/xhr.service';
import { VodPlayerService } from 'src/app/service/vod-player.service';
import { VodPlayerComponent } from 'src/app/element/vod-player.component';

@Component({
  selector: 'videojs-vod-player',
  templateUrl: './videojs.component.html',
  styleUrls: ['./videojs.component.scss']
})
export class VideojsVodPlayerComponent {

  @ViewChild(VodPlayerComponent, {static: false})
  public vodPlayer           : VodPlayerComponent
  @ViewChild('vodInfoTabEl', {static: false})
  public vodInfoTabEl        : TemplateRef<any>;
  @ContentChild('videojsVodInfoTabEl', {static: false})
  public videojsVodInfoTabEl : TemplateRef<any>;

  public init(related: Model<any,any>) {

    const vod = related.getRelations().vod;
    this.vodPlayer.init(related.getRelations().vod);
    VodPlayerService.init('player', {
      sources: [{
        src: vod.getAttrs().m3u8_url,
        type: 'application/x-mpegURL'
      }]
    });
  }

  public getElapsedTimeBySec(sec: number) {

    return parseInt(String(sec/60)) + ':' + parseInt(String(sec%60));
  }

  public seek(second: number) {

    VodPlayerService.init('player', {
      offset: second
    });
  }
}
