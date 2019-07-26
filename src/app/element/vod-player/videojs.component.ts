import * as xmlJs from 'xml-js';
import * as _ from 'lodash';
import { AfterContentInit, Component, ContentChild, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
export class VideojsVodPlayerComponent implements AfterContentInit {

  @ViewChild(VodPlayerComponent, {static: false})
  public vodPlayer           : VodPlayerComponent
  @ViewChild('vodInfoTabEl', {static: false})
  public vodInfoTabEl        : TemplateRef<any>;
  @ContentChild('videojsVodInfoTabEl', {static: false})
  public videojsVodInfoTabEl : TemplateRef<any>;
  public vc                  : ViewContainerRef;

  public constructor(vc: ViewContainerRef) {
    this.vc = vc;
  }

  public ngAfterContentInit() {
    console.log('this.videojsVodInfoTabEl', this.videojsVodInfoTabEl);
    console.log('vodInfoTabEl', this.vodInfoTabEl);
  }

  public init(related: Model<any,any>) {

    this.vodPlayer.init(related.getRelations().vod);

    from(new Promise((resolve, reject) => {

      const vod    = related.getRelations().vod;
      const review = vod.getRelations().review;
      const bj     = review.getRelations().bj;

      if ( parseInt(vod.getAttrs().duration) < 1200 ) {
        return resolve(vod);
      }

      window.addEventListener('message', (message: MessageEvent) => {
        if ( message.data.aftvVodAdDone ) {
          $('#player-outer iframe').remove();
          resolve(vod);
        }
      }, {
        capture: false
      });

      $('#player-outer').append('<iframe src="http://vod.afreecatv.com/embed.php?type=station&isAfreeca=false&autoPlay=true&showChat=false&szBjId='+bj.getAttrs().id+'&nStationNo='+bj.getAttrs().station_id+'&nBbsNo='+bj.getAttrs().bbs_id+'&nTitleNo='+review.getAttrs().id+'"></iframe>');

    })).subscribe((vod: Vod) => {
      VodPlayerService.init('player', {
        sources: [{
          src: vod.getAttrs().m3u8_url,
          type: 'application/x-mpegURL'
        }]
      });
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
