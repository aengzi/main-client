import { ChangeDetectorRef, Component, ContentChild, TemplateRef, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Model } from 'src/app/model';
import { Vod } from 'src/app/model/vod';
import { AuthService } from 'src/app/service/auth.service';
import { VodPlayerService } from 'src/app/service/vod-player.service';
import { VodClipDialogComponent } from 'src/app/element/dialog/vod-clip.component';

@Component({
  selector: 'vod-player',
  templateUrl: './vod-player.component.html',
  styleUrls: ['./vod-player.component.scss']
})
export class VodPlayerComponent {

  public authService     : AuthService;
  @ContentChild('vodPlayerEl', {static: false})
  public vodPlayerEl     : TemplateRef<any>;
  @ContentChild('vodInfoTabEl', {static: false})
  public vodInfoTabEl    : TemplateRef<any>;
  public dialog          : MatDialog;
  public vod             : Vod;
  public changeDetectRef : ChangeDetectorRef;

  public constructor(authService: AuthService, dialog: MatDialog, changeDetectRef: ChangeDetectorRef) {
    this.dialog          = dialog;
    this.authService     = authService;
    this.changeDetectRef = changeDetectRef;
  }

  // public ngAfterContentInit() {
  //   console.log('base', this.vodPlayerEl);
  //   console.log('base', this.vodInfoTabEl);
  // }

  public init(vod: Vod) {
    this.vod = vod;
    this.changeDetectRef.detectChanges();
  }

  public openClipDialog() {

    if (VodPlayerService.get('player')) {
      VodPlayerService.get('player').pause();
    }

    this.dialog.open(VodClipDialogComponent, {
      data: {
        model: this.vod
      },
      width: '320px'
    });
  }

}
