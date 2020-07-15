import * as _ from 'lodash';
import * as moment from 'moment';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Model } from 'src/app/model';
import { Clip } from 'src/app/model/clip';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
import { VodPlayerComponent } from 'src/app/element/vod/player.component';

@Component({
  selector: 'vod-clip-dialog',
  templateUrl: './vod-clip.component.html',
  styleUrls: ['./vod-clip.component.scss']
})
export class VodClipDialogComponent {

  public model             : Model<any,any>;
  public form              : FormGroup;
  public startTimeCtrl     : FormControl;
  public endTimeCtrl       : FormControl;
  public titleCtrl         : FormControl;
  public startSec          : string;
  public endSec            : string;
  public duration          : string;
  public viewRef           : MatDialogRef<VodClipDialogComponent>;
  public isCreating        : boolean = false;
  public isPreviewCreating : boolean = false;
  public vodPlayer         : VodPlayerComponent;
  public clip              : Clip;

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
          if ( this.startTimeCtrl.errors && this.endTimeCtrl.errors ) {;
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
      titleCtrl: this.titleCtrl,
      startTimeCtrl: this.startTimeCtrl,
      endTimeCtrl: this.endTimeCtrl
    });

    this.startTimeCtrl.valueChanges.subscribe((time) => {

      if (!this.startTimeCtrl.errors) {
        this.startSec = this.convertTimeToSec(time);
      }
    });

    this.endTimeCtrl.valueChanges.subscribe((time) => {

      if (!this.endTimeCtrl.errors) {
        this.endSec = this.convertTimeToSec(time);
      }
    });

    // observer should be exist before set value
    this.startTimeCtrl.setValue('0:00');
    this.endTimeCtrl.setValue('0:00');
  }

  public confirm() {

    this.isCreating = true;
    HttpService.api().post<Clip>('user/clips', {
      vod_id: this.model.getAttrs().id,
      start_sec: this.startSec,
      end_sec: this.endSec,
      title: this.titleCtrl.value
    }).subscribe(() => {

      this.isCreating = false;
      this.viewRef.close();
      StorageService.get('snack-bar').open(
        '클립 동영상이 생성 되었습니다.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
    });
  }

  private convertTimeToSec(time) {

    let s = time.split(':');

    return String(parseInt(s[0])*60+parseInt(s[1]));
  }

  public preview() {

    this.isPreviewCreating = true;

    HttpService.api().post<Clip>('temp/clips', {
      vod_id: this.model.getAttrs().id,
      start_sec: this.startSec,
      end_sec: this.endSec
    }).subscribe((clip: Clip) => {

      this.isPreviewCreating = false;
      this.clip = clip;
    });
  }
}
