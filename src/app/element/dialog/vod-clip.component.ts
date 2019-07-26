import * as _ from 'lodash';
import * as moment from 'moment';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Model } from 'src/app/model';
import { Clip } from 'src/app/model/clip';
import { Vod } from 'src/app/model/vod';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
import { VodPlayerService } from 'src/app/service/vod-player.service';

@Component({
  selector: 'vod-clip-dialog',
  templateUrl: './vod-clip.component.html',
  styleUrls: ['./vod-clip.component.scss']
})
export class VodClipDialogComponent {

  public model         : Model<any,any>;
  public form          : FormGroup;
  public startTimeCtrl : FormControl;
  public endTimeCtrl   : FormControl;
  public titleCtrl   : FormControl;
  public startedAt     : string;
  public endedAt       : string;
  public duration      : string;
  public viewRef       : MatDialogRef<VodClipDialogComponent>;

  public constructor(
    viewRef: MatDialogRef<VodClipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    const duration = parseInt(data.model.getAttrs().duration);
    this.viewRef     = viewRef;
    this.model       = data.model;
    this.titleCtrl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(32)
      ]
    });
    this.startTimeCtrl = new FormControl('0:0', {
      validators: [
        Validators.required,
        Validators.pattern(/^\d+:\d{1,2}$/)
      ]
    });
    this.endTimeCtrl   = new FormControl('0:0', {
      validators: [
        Validators.required,
        Validators.pattern(/^\d+:\d{1,2}$/),
        (control) => {
          if ( this.startTimeCtrl.errors && this.endTimeCtrl.errors ) {
            return null;
          }
          const startSec = parseInt(this.startTimeCtrl.value.split(':')[0]) * 60 + parseInt(this.startTimeCtrl.value.split(':')[1]);
          const endSec = parseInt(control.value.split(':')[0]) * 60 + parseInt(control.value.split(':')[1]);
          const errors = {};

          if ( startSec > endSec ) {
            errors['lt_start'] = true;
          }
          if ( endSec > duration ) {
            errors['gt_end'] = true;
          }
          if ( startSec + 15 > endSec ) {
            errors['lt_min_duration'] = true;
          }
          if ( startSec + 300 < endSec ) {
            errors['gt_max_duration'] = true;
          }
          if ( Object.keys(errors).length == 0 ) {
            return null;
          }

          return errors;
        }
      ]
    });
    this.form = new FormGroup({
      startTimeCtrl: this.startTimeCtrl,
      endTimeCtrl: this.endTimeCtrl
    });

    // trigger value change event
    this.startTimeCtrl.setValue('0:00');
    this.endTimeCtrl.setValue('0:00');

    this.startTimeCtrl.valueChanges.subscribe((time) => {
      this.startedAt = this.convertToTimeValue('startTimeCtrl', time);
    });

    this.endTimeCtrl.valueChanges.subscribe((time) => {
      this.endedAt = this.convertToTimeValue('endTimeCtrl', time);
    });
  }

  public confirm() {

    HttpService.api().post<Vod>('user/clips', {
      vod_id: this.model.getAttrs().id,
      started_at: this.startedAt,
      ended_at: this.endedAt,
      title: this.titleCtrl.value
    }).subscribe(() => {

      this.viewRef.close();
      StorageService.get('snack-bar').open(
        '클립 동영상이 생성 되었습니다.',
        'close', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  private convertToTimeValue(field, time) {

    let m = moment(this.model.getAttrs().started_at);
    let s = time.split(':');

    if ( s.length == 1 ) {
      s[1] = s[0];
      s[0] = '0';
    }

    s[0] = parseInt(s[0]) + Math.floor(s[1] / 60);
    s[1] = (s[1] % 60);

    if ( this[field].value != s.join(':') ) {
      this[field].setValue(s.join(':'));
    }

    m.add(s[0], 'minutes');
    m.add(s[1], 'seconds');

    return m.format('YYYY-MM-DD HH:mm:ss');
  }

  public preview() {

    HttpService.api().post<Clip>('temp/clips', {
      vod_id: this.model.getAttrs().id,
      started_at: this.startedAt,
      ended_at: this.endedAt
    }).subscribe((clip: Clip) => {

      const vod = clip.getRelations().vod;

      VodPlayerService.init('preview', {
        controls: true,
        autoplay: true,
        preload: 'auto',
        sources: [{
          src: vod.getAttrs().m3u8_url,
          type: 'application/x-mpegURL'
        }]
      });
    });
  }
}
